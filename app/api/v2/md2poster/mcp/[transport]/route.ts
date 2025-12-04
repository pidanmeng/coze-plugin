import { getMCPPrefix } from '@/app/tools/utils/getPrefix';
import { createMcpHandler } from 'mcp-handler';
import { TOOL_NAME, MD2PosterModel } from '../../model';
import { MD2PosterService } from '../../service';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'generatePoster',
      {
        title: '生成海报',
        description: '根据提供的Markdown内容生成精美的海报图片',
        inputSchema: MD2PosterModel.generatePosterMCPParams,
      },
      async (args) => {
        const res = await MD2PosterService.generatePoster(args);
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