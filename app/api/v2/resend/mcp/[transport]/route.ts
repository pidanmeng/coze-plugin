import { getMCPPrefix } from '@/app/tools/utils/getPrefix';
import { createMcpHandler } from 'mcp-handler';
import { ResendModel, TOOL_NAME } from '../../model';
import { ResendService } from '../../service';
const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'sendEmail',
      {
        title: '发送邮件',
        description: '向单独的收件人发送一封邮件',
        inputSchema: ResendModel.sendEmailMCPParams,
      },
      async (args) => {
        const res = await ResendService.sendEmail(args);
        return {
          content: [{ type: 'text', text: JSON.stringify(res) }],
        };
      }
    );
    server.registerTool(
      'sendEmailBatch',
      {
        title: '批量发送邮件',
        description: '向多个收件人发送一封邮件',
        inputSchema: ResendModel.sendEmailBatchMCPParams,
      },
      async (args) => {
        const res = await ResendService.sendEmailBatch(args);
        return {
          content: [{ type: 'text', text: JSON.stringify(res) }],
        };
      }
    );
  },
  {},
  {
    redisUrl: process.env.REDIS_URL,
    basePath: getMCPPrefix(TOOL_NAME), // this needs to match where the [transport] is located.
    maxDuration: 60,
    verboseLogs: true,
  }
);
export { handler as GET, handler as POST };
