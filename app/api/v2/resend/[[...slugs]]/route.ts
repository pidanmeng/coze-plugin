import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { serverTiming } from '@elysiajs/server-timing';
import { getPrefix } from '@/app/tools/utils/getPrefix';
import { ResendModel, TOOL_NAME } from '../model';
import { ResendService } from '../service';
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
    '/sendEmail',
    ({ body }) => {
      return ResendService.sendEmail(body);
    },
    {
      body: ResendModel.sendEmailMCPParams,
    }
  )
  .post(
    '/sendEmailBatch',
    ({ body }) => {
      return ResendService.sendEmailBatch(body);
    },
    {
      body: ResendModel.sendEmailBatchMCPParams,
    }
  );

export const GET = app.fetch;
export const POST = app.fetch;
