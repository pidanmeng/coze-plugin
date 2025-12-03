import { getMCPPrefix } from '@/app/tools/utils/getPrefix';
import { createMcpHandler } from 'mcp-handler';
import { TOOL_NAME, StockModel } from '../../model';
import { StockService } from '../../service';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'daily',
      {
        title: '获取每日行情',
        description: '查看指定股票的每日行情数据',
        inputSchema: StockModel.dailyParams,
      },
      async (args) => {
        const res = await StockService.daily(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'monthly',
      {
        title: '获取每月行情',
        description: '查看指定股票的每月行情数据',
        inputSchema: StockModel.monthlyParams,
      },
      async (args) => {
        const res = await StockService.monthly(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'weekly',
      {
        title: '获取每周行情',
        description: '查看指定股票的每周行情数据',
        inputSchema: StockModel.weeklyParams,
      },
      async (args) => {
        const res = await StockService.weekly(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'rt_k',
      {
        title: '获取实时日K',
        description: '查看股票的实时日K线数据（最新行情）',
        inputSchema: StockModel.rtKParams,
      },
      async (args) => {
        const res = await StockService.rt_k(args);
        return {
          content: [{ type: 'text', text: JSON.stringify(res) }],
        };
      }
    );

    server.registerTool(
      'stock_company',
      {
        title: '获取公司信息',
        description: '查看上市公司的基本信息与简介',
        inputSchema: StockModel.stockCompanyParams,
      },
      async (args) => {
        const res = await StockService.stock_company(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'ipo_new_share',
      {
        title: '获取新股信息',
        description: '查看近期新股（IPO）发行与上市信息',
        inputSchema: StockModel.ipoNewShareParams,
      },
      async (args) => {
        const res = await StockService.ipo_new_share(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
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
