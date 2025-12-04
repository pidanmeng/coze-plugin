import type { EcommerceMarketingModel } from './model';
import { DEFAULT_PROMPTS, EcommerceMarketingHelpers } from './model';
import {
  invokeImageToImageByQwen,
  invokeTextToImageByQwen,
  queryLibLibImageStatus,
} from '@/app/tools/utils/liblib';

export abstract class EcommerceMarketingService {
  // KV海报
  static async kvPoster(args: EcommerceMarketingModel.KvPosterParams) {
    const prompt = args.prompt || DEFAULT_PROMPTS.kvPoster;

    const result = await invokeTextToImageByQwen({
      prompt,
      width: 1472,
      height: 1140,
      enable8Steps: true,
      additionalNetwork: [
        {
          modelId: '85e4254fc4434928a434d2194faf4f36',
          weight: 0.8,
        },
      ],
    });

    console.info('kvPoster result', result);
    return result;
  }

  // 宠物海报
  static async petPoster(args: EcommerceMarketingModel.PetPosterParams) {
    const prompt = args.prompt || DEFAULT_PROMPTS.petPoster;

    const result = await invokeTextToImageByQwen({
      prompt,
      width: 1600,
      height: 900,
      enable8Steps: true,
      additionalNetwork: [
        {
          modelId: 'ee76cdd3068042d3a15717809fab343b',
          weight: 0.7,
        },
      ],
    });

    console.info('petPoster result', result);
    return result;
  }

  // 产品海报
  static async productPoster(
    args: EcommerceMarketingModel.ProductPosterParams
  ) {
    const finalPrompt = `Product Scene Poster, ${
      args.prompt || DEFAULT_PROMPTS.productPoster
    }`;

    const result = await invokeTextToImageByQwen({
      prompt: finalPrompt,
      width: 1472,
      height: 1140,
      enable8Steps: true,
      additionalNetwork: [
        {
          modelId: 'a17ee988cbe94bd299819fd393815166',
          weight: 1,
        },
      ],
    });

    console.info('productPoster result', result);
    return result;
  }

  // 小红书海报
  static async xiaohongshuPoster(
    args: EcommerceMarketingModel.XiaohongshuPosterParams
  ) {
    const finalPrompt = `FY style, ${
      args.prompt || DEFAULT_PROMPTS.xiaohongshuPoster
    }`;

    const result = await invokeTextToImageByQwen({
      prompt: finalPrompt,
      width: 1472,
      height: 1140,
      enable8Steps: true,
      additionalNetwork: [
        {
          modelId: 'f0679c6b1c5842d98b9d402dbd46c365',
          weight: 1,
        },
      ],
    });

    console.info('xiaohongshuPoster result', result);
    return result;
  }

  // 产品图精修
  static async productImageRetouching(
    args: EcommerceMarketingModel.ProductImageRetouchingParams
  ) {
    const { productImageUrl } = args;

    const result = await invokeImageToImageByQwen({
      prompt:
        'Transformed into a professional product retouching style with a white background (high precision, detail optimization, defect repair, color optimization)',
      image: productImageUrl,
      additionalNetwork: [
        {
          modelId: '8b29248ad7eb4dd5a9eb2f3c2c03da58',
          weight: 0.8,
        },
      ],
    });

    console.info('productImageRetouching result', result);
    return result;
  }

  // 场景渲染
  static async sceneRendering(
    args: EcommerceMarketingModel.SceneRenderingParams
  ) {
    const { productImageUrl } = args;

    const result = await invokeImageToImageByQwen({
      prompt:
        'Generate product-related scenes (matching scene elements with product functions/positioning) + precise perspective alignment (seamless fit between product and scene contact points, no floating/misalignment, and the perspective vanishing points of the two are exactly the same)',
      image: productImageUrl,
      additionalNetwork: [
        {
          modelId: 'eb6875a0fdae4baaae8dd61e6fbef7d4',
          weight: 0.8,
        },
      ],
    });

    console.info('sceneRendering result', result);
    return result;
  }

  // 获取图片
  static async getImageByUUID(
    args: EcommerceMarketingModel.GetImageByUUIDParams
  ) {
    const { generatedUUID } = args;
    const res = await queryLibLibImageStatus(generatedUUID);
    console.info('getImageByUUID result', res);
    return res;
  }

  // Helper 工具 - KV 海报提示词
  static getKvPosterHelper() {
    return {
      name: '3D电商KV海报提示词助手',
      description: '包含推荐的3D电商KV海报提示词',
      tips: EcommerceMarketingHelpers.KV_POSTER_TIPS,
    };
  }

  // Helper 工具 - 宠物海报提示词
  static getPetPosterHelper() {
    return {
      name: '宠物海报提示词助手',
      description: '包含推荐的宠物海报提示词',
      tips: EcommerceMarketingHelpers.PET_POSTER_TIPS,
    };
  }

  // Helper 工具 - 产品海报提示词
  static getProductPosterHelper() {
    return {
      name: '电商产品海报提示词助手',
      description: '包含推荐的电商产品海报提示词',
      tips: EcommerceMarketingHelpers.PRODUCT_POSTER_TIPS,
    };
  }

  // Helper 工具 - 小红书海报提示词
  static getXiaohongshuPosterHelper() {
    return {
      name: '小红书风格海报提示词助手',
      description: '包含推荐的小红书风格海报提示词',
      tips: EcommerceMarketingHelpers.XIAOHONGSU_POSTER_TIPS,
    };
  }
}
