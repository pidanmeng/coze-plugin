import type { PhotoStudioModel } from './model';
import {
  invokeLibLibWorkflow,
  invokeImageToImageByQwen,
  type GenerateParams,
  type ImageToImageParams,
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
    const generateParams: GenerateParams = {
      '20': { class_type: 'LoadImage', inputs: { image: productImageUrl } },
      workflowUuid: '3ce63f1f851942e59b32f17866c4c1c7',
    };
    const res = await invokeLibLibWorkflow({
      templateUuid: '4df2efa0f18d46dc9758803e478eb51c',
      generateParams,
    });
    console.info('productImageRetouching result', res);
    return res;
  }

  static async textureEnhancement(
    args: PhotoStudioModel.TextureEnhancementParams
  ) {
    const { imageUrl } = args;
    const generateParams: GenerateParams = {
      '131': { class_type: 'LoadImage', inputs: { image: imageUrl } },
      '205': {
        class_type: 'LoraLoader',
        inputs: {
          lora_name: '0cf6cf2b87bc43f48603b5905dc6c2c5',
          strength_model: 1,
        },
      },
      workflowUuid: 'c44f310cd0df4771be5bddfea6350c3a',
    };
    const res = await invokeLibLibWorkflow({
      templateUuid: '4df2efa0f18d46dc9758803e478eb51c',
      generateParams,
    });
    console.info('textureEnhancement result', res);
    return res;
  }
}
