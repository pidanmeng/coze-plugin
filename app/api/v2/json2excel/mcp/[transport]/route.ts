import { getMCPPrefix } from '@/app/tools/utils/getPrefix';
import { createMcpHandler } from 'mcp-handler';
import { TOOL_NAME, Json2ExcelModel } from '../../model';
import { Json2ExcelService } from '../../service';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'convertJsonToExcel',
      {
        title: 'JSON转Excel',
        description: '将JSON数据转换为Excel文件并上传到CDN',
        inputSchema: Json2ExcelModel.jsonToExcelMCPParams,
      },
      async (args) => {
        const res = await Json2ExcelService.convertJsonToExcel(args);
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