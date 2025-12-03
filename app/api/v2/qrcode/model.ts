import z from 'zod';

export const TOOL_NAME = 'qrcode';

export namespace QRCodeModel {
  export const generateQRCodeMCPParams = z.object({
    content: z
      .string()
      .min(1, { message: '内容不能为空' })
      .describe('二维码内容'),
    title: z
      .string()
      .optional()
      .describe('二维码标题'),
    subtitle: z
      .string()
      .optional()
      .describe('二维码副标题'),
    logo: z
      .string()
      .optional()
      .describe('二维码logo 图片URL')
      .default(
        'https://mdn.alipayobjects.com/huamei_b00jk5/afts/img/A*6C8bRZHm4YoAAAAAAAAAAAAADgitAQ/original'
      ),
    style: z
      .enum(['alipay', 'wechat', 'standard'])
      .optional()
      .describe('二维码样式(可选值: alipay, wechat, standard)')
      .default('alipay'),
  });

  export type GenerateQRCodeParams = z.infer<typeof generateQRCodeMCPParams>;

  export const scanQRCodeMCPParams = z.object({
    imageUrl: z.url().describe('二维码图片URL'),
  });

  export type ScanQRCodeParams = z.infer<typeof scanQRCodeMCPParams>;

  // 添加批量扫描二维码的参数类型定义
  export const scanQRCodeBatchMCPParams = z.object({
    imageUrls: z
      .array(z.url())
      .min(1, { message: '至少需要一个图片URL' })
      .max(10, { message: '最多允许10个图片URL' })
      .describe('二维码图片URL列表'),
  });

  export type ScanQRCodeBatchParams = z.infer<typeof scanQRCodeBatchMCPParams>;
}
