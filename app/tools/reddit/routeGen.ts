import {
  getCommentsBySubmission,
  getSubmission,
  getSubReddit,
  searchPosts,
  searchSubReddit,
  getComment,
} from './tools';
import { getApp } from '../utils/app';

export function registerRedditRoutes() {
  const app = getApp();

  app.get('/reddit/getSubReddit', async (c) => {
    const response = await getSubReddit({
      name: c.req.query('name') as string,
    });
    return c.json(response);
  });

  app.get('/reddit/searchPosts', async (c) => {
    const response = await searchPosts({
      subreddit: c.req.query('subreddit') as string,
      query: c.req.query('query') as string,
      sort: c.req.query('sort') as string as
        | 'relevance'
        | 'hot'
        | 'new'
        | 'top'
        | 'comments',
      time: c.req.query('time') as string as
        | 'week'
        | 'month'
        | 'year'
        | 'all'
        | 'day'
        | 'hour',
      limit: Number(c.req.query('limit') as string),
    });
    return c.json(response);
  });

  app.get('/reddit/getSubmission', async (c) => {
    const response = await getSubmission({
      id: c.req.query('id') as string,
    });
    return c.json(response);
  });

  app.get('/reddit/getCommentsBySubmission', async (c) => {
    const response = await getCommentsBySubmission({
      submission_id: c.req.query('submission_id') as string,
      sort: c.req.query('sort') as
        | 'confidence'
        | 'top'
        | 'new'
        | 'controversial'
        | 'old'
        | 'random'
        | 'qa'
        | 'live',
      limit: Number(c.req.query('limit') as string),
    });
    return c.json(response);
  });

  app.get('/reddit/getComment', async (c) => {
    const response = await getComment({
      id: c.req.query('id') as string,
    });
    return c.json(response);
  });

  app.get('/reddit/searchSubReddit', async (c) => {
    const response = await searchSubReddit({
      query: c.req.query('query') as string,
      limit: Number(c.req.query('limit') as string),
    });
    return c.json(response);
  });
}
