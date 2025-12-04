import type { PhotoStudioModel } from './model';
import {
  invokeLibLibWorkflow,
  invokeImageToImageByQwen,
  type GenerateParams,
  type ImageToImageParams,
  queryLibLibImageStatus,
} from '@/app/tools/utils/liblib';

export abstract class PhotoStudioService {
  static async changeClothes(args: PhotoStudioModel.ChangeClothesParams) {
    const {
      modelImageUrl,
      clothImageUrl,
      prompt = '让图1的模特穿上图2的套装服饰，保持动作不变，生成全身照',
    } = args;

    const generateParams: GenerateParams = {
      '28': { class_type: 'LoadImage', inputs: { image: modelImageUrl } },
      '30': { class_type: 'LoadImage', inputs: { image: clothImageUrl } },
      '59': { class_type: 'GeminiImageNode', inputs: { prompt } },
      workflowUuid: 'b3a998090a6d4daeb55732254333533c',
    };

    const res = await invokeLibLibWorkflow({
      templateUuid: '4df2efa0f18d46dc9758803e478eb51c',
      generateParams,
    });
    console.info('changeClothes result', res);
    return res;
  }

  static async idPhoto(args: PhotoStudioModel.IdPhotoParams) {
    const { imageUrl } = args;
    const generateParams: ImageToImageParams = {
      image: imageUrl,
      prompt:
        '将这张图上的人改为红底一寸照片，衣服改为西装领带，发型不变，去掉帽子、眼镜和口罩 ，去掉纹身',
    };

    const res = await invokeImageToImageByQwen(generateParams);
    console.info('idPhoto result', res);
    return res;
  }

  static async oldPhotoRestoration(
    args: PhotoStudioModel.OldPhotoRestorationParams
  ) {
    const {
      imageUrl,
      prompt = 'Restore and colorize this image. Remove any scratches or imperfections.',
    } = args;
    const generateParams: GenerateParams = {
      '191': { class_type: 'LoadImage', inputs: { image: imageUrl } },
      '196': { class_type: 'Text Multiline', inputs: { text: prompt } },
      workflowUuid: '2096b4fa51854407b2d2c75962ac81dd',
    };
    const res = await invokeLibLibWorkflow({
      templateUuid: '4df2efa0f18d46dc9758803e478eb51c',
      generateParams,
    });
    console.info('oldPhotoRestoration result', res);
    return res;
  }

  static async portraitRetouching(
    args: PhotoStudioModel.PortraitRetouchingParams
  ) {
    const { imageUrl } = args;
    const generateParams: ImageToImageParams = {
      image: imageUrl,
      prompt:
        '精修这张人像照片，调整构图，降低背景的杂乱程度，在保持人物特征、表情、动作、服饰的情况下，让人物更符合大众审美',
    };

    const res = await invokeImageToImageByQwen(generateParams);
    console.info('idPhoto result', res);
    return res;
  }

  static async productImageRetouching(
    args: PhotoStudioModel.ProductImageRetouchingParams
  ) {
    const { productImageUrl } = args;
    const generateParams: ImageToImageParams = {
      prompt:
        'Transformed into a professional product retouching style with a white background (high precision, detail optimization, defect repair, color optimization)',
      image: productImageUrl,
      additionalNetwork: [
        {
          modelId: '8b29248ad7eb4dd5a9eb2f3c2c03da58',
          weight: 0.8,
        },
      ],
    };
    const res = await invokeImageToImageByQwen(generateParams);
    console.info('productImageRetouching result', res);
    return res;
  }

  static async textureEnhancement(
    args: PhotoStudioModel.TextureEnhancementParams
  ) {
    const { imageUrl } = args;
    const generateParams: ImageToImageParams = {
      image: imageUrl,
      prompt:
        'Super-resolution image enhancement technology can generate redrawn high-definition images with clear details, delicate textures, sharp edges, noise-free output, and lossless upscaling capabilities.',
      additionalNetwork: [
        {
          modelId: '5f5a6a1e33394347b5c0d335f5c86c47',
          weight: 0.8,
        },
      ],
    };
    const res = await invokeImageToImageByQwen(generateParams);
    console.info('textureEnhancement result', res);
    return res;
  }

  static async getImageByUUID(args: PhotoStudioModel.GetImageByUUIDParams) {
    const { generatedUUID } = args;
    const res = await queryLibLibImageStatus(generatedUUID);
    console.info('getImageByUUID result', res);
    return res;
  }
}
