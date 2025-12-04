import { getMCPPrefix } from '@/app/tools/utils/getPrefix';
import { createMcpHandler } from 'mcp-handler';
import { EcommerceMarketingModel, TOOL_NAME } from '../../model';
import { EcommerceMarketingService } from '../../service';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'kvPoster',
      {
        title: '3D电商KV海报',
        description: '生成3D电商KV海报',
        inputSchema: EcommerceMarketingModel.kvPosterParams,
      },
      async (args) => {
        const res = await EcommerceMarketingService.kvPoster(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'petPoster',
      {
        title: '宠物风格海报',
        description: '生成卡通风格宠物海报（默认 16:9）',
        inputSchema: EcommerceMarketingModel.petPosterParams,
      },
      async (args) => {
        const res = await EcommerceMarketingService.petPoster(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'productPoster',
      {
        title: '电商产品海报',
        description: '质感商业级电商产品场景海报',
        inputSchema: EcommerceMarketingModel.productPosterParams,
      },
      async (args) => {
        const res = await EcommerceMarketingService.productPoster(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'xiaohongshuPoster',
      {
        title: '小红书风格海报',
        description: '生成小红书风格的海报',
        inputSchema: EcommerceMarketingModel.xiaohongshuPosterParams,
      },
      async (args) => {
        const res = await EcommerceMarketingService.xiaohongshuPoster(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'productImageRetouching',
      {
        title: '产品图精修',
        description: '产品图精修工具，改为白色背景',
        inputSchema: EcommerceMarketingModel.productImageRetouchingParams,
      },
      async (args) => {
        const res = await EcommerceMarketingService.productImageRetouching(
          args
        );
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'sceneRendering',
      {
        title: '产品场景渲染图',
        description:
          '通过产品图生成带场景的渲染图工具，基于产品图片生成具有特定场景的高质量渲染图',
        inputSchema: EcommerceMarketingModel.sceneRenderingParams,
      },
      async (args) => {
        const res = await EcommerceMarketingService.sceneRendering(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'getImageByUUID',
      {
        title: '获取图片',
        description:
          '根据 UUID 查询生图状态，包括图片生成进度以及生成的图片地址',
        inputSchema: EcommerceMarketingModel.getImageByUUIDParams,
      },
      async (args) => {
        const res = await EcommerceMarketingService.getImageByUUID(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'kvPosterHelper',
      {
        title: '3D电商KV海报提示词助手',
        description: '包含推荐的3D电商KV海报提示词',
        inputSchema: EcommerceMarketingModel.getImageByUUIDParams.omit({}),
      },
      async () => {
        const helper = EcommerceMarketingService.getKvPosterHelper();
        return { content: [{ type: 'text', text: helper.tips }] };
      }
    );

    server.registerTool(
      'petPosterHelper',
      {
        title: '宠物海报提示词助手',
        description: '包含推荐的宠物海报提示词',
        inputSchema: EcommerceMarketingModel.getImageByUUIDParams.omit({}),
      },
      async () => {
        const helper = EcommerceMarketingService.getPetPosterHelper();
        return { content: [{ type: 'text', text: helper.tips }] };
      }
    );

    server.registerTool(
      'productPosterHelper',
      {
        title: '电商产品海报提示词助手',
        description: '包含推荐的电商产品海报提示词',
        inputSchema: EcommerceMarketingModel.getImageByUUIDParams.omit({}),
      },
      async () => {
        const helper = EcommerceMarketingService.getProductPosterHelper();
        return { content: [{ type: 'text', text: helper.tips }] };
      }
    );

    server.registerTool(
      'xiaohongshuPosterHelper',
      {
        title: '小红书风格海报提示词助手',
        description: '包含推荐的小红书风格海报提示词',
        inputSchema: EcommerceMarketingModel.getImageByUUIDParams.omit({}),
      },
      async () => {
        const helper = EcommerceMarketingService.getXiaohongshuPosterHelper();
        return { content: [{ type: 'text', text: helper.tips }] };
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
