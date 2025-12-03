import { getMCPPrefix } from '@/app/tools/utils/getPrefix';
import { createMcpHandler } from 'mcp-handler';
import { PhotoStudioModel, TOOL_NAME } from '../../model';
import { PhotoStudioService } from '../../service';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'changeClothes',
      {
        title: '换装',
        description: '换装工具，让模特穿上指定的服装',
        inputSchema: PhotoStudioModel.changeClothesParams,
      },
      async (args) => {
        const res = await PhotoStudioService.changeClothes(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'idPhoto',
      {
        title: '证件照生成',
        description: '证件照生成工具',
        inputSchema: PhotoStudioModel.idPhotoParams,
      },
      async (args) => {
        const res = await PhotoStudioService.idPhoto(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'oldPhotoRestoration',
      {
        title: '老照片修复',
        description: '修复和上色老照片，去除划痕和瑕疵',
        inputSchema: PhotoStudioModel.oldPhotoRestorationParams,
      },
      async (args) => {
        const res = await PhotoStudioService.oldPhotoRestoration(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'petOutfitChange',
      {
        title: '宠物换装',
        description: '宠物换装工具，给宠物穿上指定的服饰',
        inputSchema: PhotoStudioModel.petOutfitChangeParams,
      },
      async (args) => {
        const res = await PhotoStudioService.petOutfitChange(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'portraitRetouching',
      {
        title: '人像精修',
        description: '人像精修工具，对人物照片进行美白、提升分辨率和减少AI感',
        inputSchema: PhotoStudioModel.portraitRetouchingParams,
      },
      async (args) => {
        const res = await PhotoStudioService.portraitRetouching(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'productImageRetouching',
      {
        title: '产品图精修',
        description: '产品图精修工具，对商品图片进行专业精修处理',
        inputSchema: PhotoStudioModel.productImageRetouchingParams,
      },
      async (args) => {
        const res = await PhotoStudioService.productImageRetouching(args);
        return { content: [{ type: 'text', text: JSON.stringify(res) }] };
      }
    );

    server.registerTool(
      'textureEnhancement',
      {
        title: '质感增强',
        description: '质感增强工具，对图片进行质感增强处理',
        inputSchema: PhotoStudioModel.textureEnhancementParams,
      },
      async (args) => {
        const res = await PhotoStudioService.textureEnhancement(args);
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
