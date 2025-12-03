import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { serverTiming } from '@elysiajs/server-timing';
import { getPrefix } from '@/app/tools/utils/getPrefix';
import z from 'zod';
import { TOOL_NAME, StockModel } from '../model';
import { StockService } from '../service';

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
    '/daily',
    ({ body }) => {
      return StockService.daily(body);
    },
    { body: StockModel.dailyParams }
  )
  .post(
    '/monthly',
    ({ body }) => {
      return StockService.monthly(body);
    },
    { body: StockModel.monthlyParams }
  )
  .post(
    '/weekly',
    ({ body }) => {
      return StockService.weekly(body);
    },
    { body: StockModel.weeklyParams }
  )
  .post(
    '/rt_k',
    ({ body }) => {
      return StockService.rt_k(body);
    },
    { body: StockModel.rtKParams }
  )
  .post(
    '/stock_company',
    ({ body }) => {
      return StockService.stock_company(body);
    },
    { body: StockModel.stockCompanyParams }
  )
  .post(
    '/ipo_new_share',
    ({ body }) => {
      return StockService.ipo_new_share(body);
    },
    { body: StockModel.ipoNewShareParams }
  );

export const GET = app.fetch;
export const POST = app.fetch;
