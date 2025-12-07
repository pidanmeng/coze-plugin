import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { serverTiming } from '@elysiajs/server-timing';
import { getPrefix } from '@/app/tools/utils/getPrefix';
import { Json2ExcelModel, TOOL_NAME } from '../model';
import { Json2ExcelService } from '../service';
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
    '/convertJsonToExcel',
    ({ body }) => {
      return Json2ExcelService.convertJsonToExcel(body);
    },
    {
      body: Json2ExcelModel.jsonToExcelMCPParams,
    }
  )
  .post(
    '/convertExcelToJson',
    ({ body }) => {
      return Json2ExcelService.convertExcelToJson(body);
    },
    {
      body: Json2ExcelModel.excelToJsonMCPParams,
    }
  );

export const GET = app.fetch;
export const POST = app.fetch;
