import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { serverTiming } from '@elysiajs/server-timing';
import { getPrefix } from '@/app/tools/utils/getPrefix';
import { MD2PosterModel, TOOL_NAME } from '../model';
import { MD2PosterService } from '../service';
import z from 'zod';

const app = new Elysia({ prefix: getPrefix(TOOL_NAME) })
  .use(
    openapi({
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    })
  )
  .use(serverTiming())
  .post(
    '/generatePoster',
    ({ body }) => {
      return MD2PosterService.generatePoster(body);
    },
    {
      body: MD2PosterModel.generatePosterMCPParams,
    }
  );

export const GET = app.fetch;
export const POST = app.fetch;

export type MD2PosterBackend = typeof app;
