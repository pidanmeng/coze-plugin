import z from 'zod';

export const zGetSubRedditParams = z.object({
  name: z.string().describe('要获取的 subreddit 名称'),
});

export const zSearchPostsParams = z.object({
  subreddit: z.string().describe('要搜索的 subreddit 名称'),
  query: z.string().optional().describe('搜索查询').default(''), // 将query设为可选，并提供默认值
  sort: z
    .enum(['relevance', 'hot', 'new', 'top', 'comments'])
    .optional()
    .describe('结果排序方式')
    .default('hot'),
  time: z
    .enum(['all', 'hour', 'day', 'week', 'month', 'year'])
    .optional()
    .describe('搜索时间范围')
    .default('all'),
  limit: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .describe('返回的最大帖子数量')
    .default(10),
});

export const zGetSubmissionParams = z.object({
  id: z.string().describe('要获取的帖子 ID'),
});

export const zGetCommentsBySubmissionParams = z.object({
  submission_id: z.string().describe('要获取评论的帖子 ID'),
  sort: z
    .enum([
      'confidence',
      'top',
      'new',
      'controversial',
      'old',
      'random',
      'qa',
      'live',
    ])
    .optional()
    .describe('评论排序方式'),
  limit: z.number().min(1).max(100).optional().describe('返回的最大评论数量'),
});

export const zGetComment = z.object({
  id: z.string().describe('要获取的评论 ID'),
});

export const zSearchSubRedditParams = z.object({
  query: z.string().describe('搜索查询'),
  limit: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .describe('返回的最大 subreddit 数量'),
});
