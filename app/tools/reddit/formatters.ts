export interface FormattedSubredditData {
  subreddit: string;
  title: string;
  description: string;
  subscribers: string;
  createdAt: string;
  nsfw: string;
  url: string;
}

export function formatSubredditData(subreddit: any): FormattedSubredditData {
  return {
    subreddit: `r/${subreddit.display_name}`,
    title: subreddit.title,
    description: subreddit.public_description || '无描述',
    subscribers: subreddit.subscribers.toLocaleString(),
    createdAt: new Date(subreddit.created_utc * 1000).toISOString(),
    nsfw: subreddit.over18 ? '是' : '否',
    url: `https://www.reddit.com${subreddit.url}`,
  };
}

export interface FormattedSearchResult {
  index: number;
  title: string;
  subreddit: string;
  author: string;
  score: number;
  numComments: number;
  url: string;
  id: string;
}

export function formatSearchResults(posts: any[]): FormattedSearchResult[] | string {
  if (!posts || posts.length === 0) {
    return '未找到符合搜索条件的帖子。';
  }

  return posts.map((post, index) => {
    const p = post.data;
    return {
      index: index + 1,
      title: p.title,
      subreddit: `r/${p.subreddit}`,
      author: `u/${p.author}`,
      score: p.score,
      numComments: p.num_comments,
      url: `https://www.reddit.com${p.permalink}`,
      id: p.id,
    };
  });
}

export interface FormattedSubmissionData {
  title: string;
  author: string;
  subreddit: string;
  score: number;
  numComments: number;
  createdAt: string;
  nsfw: string;
  url: string;
  contentType: string;
  content: string;
}

export function formatSubmissionData(submission: any): FormattedSubmissionData {
  return {
    title: submission.title,
    author: `u/${submission.author}`,
    subreddit: `r/${submission.subreddit}`,
    score: submission.score,
    numComments: submission.num_comments,
    createdAt: new Date(submission.created_utc * 1000).toISOString(),
    nsfw: submission.over_18 ? '是' : '否',
    url: `https://www.reddit.com${submission.permalink}`,
    contentType: submission.is_self ? '文本帖' : '链接帖',
    content: submission.is_self ? submission.selftext : submission.url,
  };
}

export interface FormattedCommentData {
  index?: number;
  author: string;
  score: number;
  createdAt: string;
  id: string;
  content: string;
  subreddit?: string;
  linkId?: string;
}

export function formatCommentsData(comments: any[]): FormattedCommentData[] | string {
  if (!comments || comments.length === 0) {
    return '此帖子没有评论。';
  }

  return comments.map((comment, index) => {
    const c = comment.data;
    return {
      index: index + 1,
      author: `u/${c.author}`,
      score: c.score,
      createdAt: new Date(c.created_utc * 1000).toISOString(),
      id: c.id,
      content: c.body,
    };
  });
}

export function formatCommentData(comment: any): FormattedCommentData {
  return {
    id: comment.id,
    author: `u/${comment.author}`,
    score: comment.score,
    createdAt: new Date(comment.created_utc * 1000).toISOString(),
    subreddit: `r/${comment.subreddit}`,
    linkId: comment.link_id,
    content: comment.body,
  };
}

export interface FormattedSubredditSearchResult {
  index: number;
  displayName: string;
  title: string;
  description: string;
  subscribers: string;
  nsfw: string;
  url: string;
}

export function formatSubredditSearchResults(subreddits: any[]): FormattedSubredditSearchResult[] | string {
  if (!subreddits || subreddits.length === 0) {
    return '未找到符合搜索条件的 subreddits。';
  }

  return subreddits.map((subreddit, index) => {
    const s = subreddit.data;
    return {
      index: index + 1,
      displayName: `r/${s.display_name}`,
      title: s.title,
      description: s.public_description || '无描述',
      subscribers: s.subscribers.toLocaleString(),
      nsfw: s.over18 ? '是' : '否',
      url: `https://www.reddit.com${s.url}`,
    };
  });
}
