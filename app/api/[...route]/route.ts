'use server';

import { registerRedditRoutes } from '@/app/tools/reddit/routeGen';
import { getApp } from '@/app/tools/utils/app';
import { handle } from 'hono/vercel';

const app = getApp();
registerRedditRoutes();

export const GET = handle(app);
