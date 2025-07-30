import z from 'zod';
import { redditApiRequest } from './redditApiRequest';
import {
  zGetComment,
  zGetCommentsBySubmissionParams,
  zGetSubmissionParams,
  zGetSubRedditParams,
  zSearchPostsParams,
  zSearchSubRedditParams,
} from './schemas';
import {
  formatCommentData,
  formatCommentsData,
  formatSearchResults,
  formatSubmissionData,
  formatSubredditData,
  formatSubredditSearchResults,
} from './formatters';

export async function getSubReddit({
  name,
}: z.infer<typeof zGetSubRedditParams>) {
  try {
    const subreddit = await redditApiRequest(`/r/${name}/about`);
    return formatSubredditData(subreddit.data);
  } catch (error) {
    return null;
  }
}

export async function searchPosts({
  subreddit,
  query,
  sort,
  time,
  limit,
}: z.infer<typeof zSearchPostsParams>) {
  try {
    // 如果提供了查询，则执行搜索，否则获取热门帖子
    let endpoint;
    let params: {
      q?: string;
      sort?: typeof sort;
      t?: typeof time;
      limit?: string;
      restrict_sr?: string;
    } = {};

    if (query && query.trim() !== '') {
      // 有查询词时进行搜索
      endpoint = `/r/${subreddit}/search`;
      params = {
        q: query,
        sort,
        t: time,
        limit: limit.toString(),
        restrict_sr: 'true',
      };
    } else {
      // 无查询词时根据sort返回对应的帖子列表
      switch (sort) {
        case 'hot':
          endpoint = `/r/${subreddit}/hot`;
          break;
        case 'new':
          endpoint = `/r/${subreddit}/new`;
          break;
        case 'top':
          endpoint = `/r/${subreddit}/top`;
          params.t = time;
          break;
        default:
          endpoint = `/r/${subreddit}/hot`;
      }

      params.limit = limit.toString();
    }

    const results = await redditApiRequest(endpoint, params);

    return formatSearchResults(results.data.children);
  } catch (error: any) {
    return null;
  }
}

export async function getSubmission({
  id,
}: z.infer<typeof zGetSubmissionParams>) {
  try {
    const cleanId = id.replace('t3_', '');
    const submission = await redditApiRequest(`/comments/${cleanId}`, {
      limit: '1',
    });

    return formatSubmissionData(submission[0].data.children[0].data);
  } catch (error) {
    return null;
  }
}

export async function getCommentsBySubmission({
  submission_id,
  sort = 'confidence',
  limit = 10,
}: z.infer<typeof zGetCommentsBySubmissionParams>) {
  try {
    // 清理ID（如果有前缀）
    const cleanId = submission_id.replace('t3_', '');

    const params = {
      sort,
      limit: limit.toString(),
    };

    const data = await redditApiRequest(`/comments/${cleanId}`, params);
    const comments = data[1].data.children.filter(
      (child: { kind?: string }) => child.kind === 't1'
    );

    return formatCommentsData(comments);
  } catch (error) {
    return null;
  }
}

export async function getComment({ id }: z.infer<typeof zGetComment>) {
  try {
    const cleanId = id.replace('t1_', '');
    const comment = await redditApiRequest(`/api/info`, {
      id: `t1_${cleanId}`,
    });

    if (!comment.data.children || comment.data.children.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `未找到ID为 ${id} 的评论`,
          },
        ],
      };
    }

    return formatCommentData(comment.data.children[0].data);
  } catch (error) {
    return null;
  }
}

export async function searchSubReddit({
  query,
  limit = 10,
}: z.infer<typeof zSearchSubRedditParams>) {
  try {
    const params = {
      q: query,
      limit: limit.toString(),
    };

    const results = await redditApiRequest(`/subreddits/search`, params);

    return formatSubredditSearchResults(results.data.children);
  } catch (error) {
    return null;
  }
}
