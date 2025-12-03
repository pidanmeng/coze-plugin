import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { serverTiming } from '@elysiajs/server-timing';
import { getPrefix } from '@/app/tools/utils/getPrefix';
import { QRCodeModel, TOOL_NAME } from '../model';
import { QRCodeService } from '../service';
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
    '/generateQRCode',
    ({ body }) => {
      return QRCodeService.generateQRCode(body);
    },
    {
      body: QRCodeModel.generateQRCodeMCPParams,
    }
  )
  .post(
    '/scanQRCode',
    ({ body }) => {
      return QRCodeService.scanQRCode(body);
    },
    {
      body: QRCodeModel.scanQRCodeMCPParams,
    }
  )
  .post(
    '/scanQRCodeBatch',
    ({ body }) => {
      return QRCodeService.scanQRCodeBatch(body);
    },
    {
      body: QRCodeModel.scanQRCodeBatchMCPParams,
    }
  );

export const GET = app.fetch;
export const POST = app.fetch;
