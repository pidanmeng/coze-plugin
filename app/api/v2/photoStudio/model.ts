import z from 'zod';

export const TOOL_NAME = 'photoStudio';

export namespace PhotoStudioModel {
  export const changeClothesParams = z.object({
    modelImageUrl: z.url().describe('模特图片的URL地址'),
    clothImageUrl: z.url().describe('衣服图片的URL地址'),
    prompt: z
      .string()
      .optional()
      .describe('提示词，用于指导换装过程')
      .default('让图1的模特穿上图2的套装服饰，保持动作不变，生成全身照'),
  });

  export const idPhotoParams = z.object({
    imageUrl: z.url().describe('原图的URL地址'),
  });

  export const oldPhotoRestorationParams = z.object({
    imageUrl: z.url().describe('老照片的URL地址'),
    prompt: z
      .string()
      .optional()
      .describe('英文提示词，指导修复过程')
      .default(
        'Restore and colorize this image. Remove any scratches or imperfections.'
      ),
  });

  export const getImageByUUIDParams = z.object({
    generatedUUID: z.string().describe('图片的UUID'),
  });

  export const portraitRetouchingParams = z.object({
    imageUrl: z.url().describe('原图的URL地址'),
  });

  export const productImageRetouchingParams = z.object({
    productImageUrl: z.url().describe('商品图的URL地址'),
  });

  export const textureEnhancementParams = z.object({
    imageUrl: z.url().describe('原图的URL地址'),
  });
  export type ChangeClothesParams = z.infer<
    typeof PhotoStudioModel.changeClothesParams
  >;

  export type IdPhotoParams = z.infer<typeof PhotoStudioModel.idPhotoParams>;

  export type OldPhotoRestorationParams = z.infer<
    typeof PhotoStudioModel.oldPhotoRestorationParams
  >;

  export type PortraitRetouchingParams = z.infer<
    typeof PhotoStudioModel.portraitRetouchingParams
  >;

  export type ProductImageRetouchingParams = z.infer<
    typeof PhotoStudioModel.productImageRetouchingParams
  >;

  export type TextureEnhancementParams = z.infer<
    typeof PhotoStudioModel.textureEnhancementParams
  >;

  export type GetImageByUUIDParams = z.infer<
    typeof PhotoStudioModel.getImageByUUIDParams
  >;
}
