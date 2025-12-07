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
      detail: {
        summary: '将JSON数据转换为Excel文件',
        description: '将提供的JSON数据转换为Excel文件并上传到CDN，返回文件访问链接',
        examples: [
          {
            name: '示例：用户数据转换',
            value: Json2ExcelModel.DEFAULT_EXAMPLE_DATA,
          }
        ]
      }
    }
  );

export const GET = app.fetch;
export const POST = app.fetch;