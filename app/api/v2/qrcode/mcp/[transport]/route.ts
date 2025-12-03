import { getMCPPrefix } from '@/app/tools/utils/getPrefix';
import { createMcpHandler } from 'mcp-handler';
import { TOOL_NAME, QRCodeModel } from '../../model';
import { QRCodeService } from '../../service';
const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'generateQRCode',
      {
        title: '生成二维码',
        description: '根据提供的内容生成带有品牌元素的二维码图片',
        inputSchema: QRCodeModel.generateQRCodeMCPParams,
      },
      async (args) => {
        const res = await QRCodeService.generateQRCode(args);
        return {
          content: [{ type: 'text', text: JSON.stringify(res) }],
        };
      }
    );

    server.registerTool(
      'scanQRCode',
      {
        title: '扫描二维码',
        description: '从图片URL中识别并提取二维码内容',
        inputSchema: QRCodeModel.scanQRCodeMCPParams,
      },
      async (args) => {
        const res = await QRCodeService.scanQRCode(args);
        return {
          content: [{ type: 'text', text: JSON.stringify(res) }],
        };
      }
    );

    server.registerTool(
      'scanQRCodeBatch',
      {
        title: '批量扫描二维码',
        description: '从多个图片URL中识别并提取二维码内容',
        inputSchema: QRCodeModel.scanQRCodeBatchMCPParams,
      },
      async (args) => {
        const res = await QRCodeService.scanQRCodeBatch(args);
        return {
          content: [{ type: 'text', text: JSON.stringify(res) }],
        };
      }
    );
  },
  {},
  {
    redisUrl: process.env.REDIS_URL,
    basePath: getMCPPrefix(TOOL_NAME),
    maxDuration: 60,
    verboseLogs: true,
  }
);
export { handler as GET, handler as POST };
