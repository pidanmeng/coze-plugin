import { uploadFile } from '../../../tools/utils/upload';
import satori from 'satori';
import sharp from 'sharp';
import axios from 'axios';
import jsQR from 'jsqr';
import type { QRCodeModel } from './model';
import { StandardQRCode } from './template/standardQRCode';
import { loadFonts } from '../../../tools/utils/fontLoader';

export abstract class QRCodeService {
  static readonly STYLE_COLOR_MAP = {
    alipay: '#1677FF',
    wechat: '#07C160',
    standard: '#222',
  } as const;

  static async generateQRCode(args: QRCodeModel.GenerateQRCodeParams) {
    try {
      const { style = 'alipay' } = args;
      const mainColor =
        this.STYLE_COLOR_MAP[style as keyof typeof this.STYLE_COLOR_MAP];

      const Element = await StandardQRCode({
        content: args.content,
        subtitle: args.subtitle,
        title: args.title,
        logoUrl: args.logo,
        mainColor: mainColor,
      });

      const svg = await satori(Element, {
        width: 800,
        fonts: [...loadFonts()],
      });
      console.info('Generated SVG length: ' + svg.length);
      const sharpJPG = await sharp(Buffer.from(svg)).jpeg();
      const uuid = crypto.randomUUID();

      const buffer = await sharpJPG.toBuffer();
      const arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      ) as ArrayBuffer;

      const file = new File([arrayBuffer], `${uuid}.jpg`, {
        type: 'image/jpeg',
      });
      const result = await uploadFile(file);
      return result;
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  static async scanQRCode(args: QRCodeModel.ScanQRCodeParams) {
    const { imageUrl } = args;

    try {
      // 下载图片数据
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 2000,
      });

      // 获取内容类型
      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error('URL does not point to an image');
      }

      // 将图片数据转换为Buffer
      const imageBuffer = Buffer.from(response.data);

      // 使用sharp处理图像
      const image = sharp(imageBuffer);
      const metadata = await image
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      // 将图像数据转换为Uint8ClampedArray格式供jsQR使用
      const imageData = new Uint8ClampedArray(metadata.data.buffer);

      // 使用jsQR解析二维码
      const code = jsQR(imageData, metadata.info.width, metadata.info.height);

      if (code) {
        return {
          status: 'success',
          format: 'QR_CODE',
          content: code.data,
          timestamp: new Date().toISOString(),
        };
      } else {
        throw new Error('Failed to decode QR code');
      }
    } catch (error: any) {
      return {
        status: 'error',
        message: 'Failed to fetch or process image',
        error: error.message,
      };
    }
  }

  // 添加批量扫描二维码方法
  static async scanQRCodeBatch(args: { imageUrls: string[] }) {
    const { imageUrls } = args;

    const results: Array<{
      url: string;
      status: 'success' | 'error';
      format?: string;
      content?: string;
      message?: string;
      error?: string;
      timestamp?: string;
    }> = [];

    // 处理每个URL
    for (const imageUrl of imageUrls) {
      try {
        // 下载图片数据
        const response = await axios.get(imageUrl, {
          responseType: 'arraybuffer',
          timeout: 2000,
        });

        // 获取内容类型
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.startsWith('image/')) {
          results.push({
            url: imageUrl,
            status: 'error',
            message: 'Failed to fetch or process image',
            error: 'URL does not point to an image',
          });
          continue;
        }

        // 将图片数据转换为Buffer
        const imageBuffer = Buffer.from(response.data);

        // 使用sharp处理图像
        const image = sharp(imageBuffer);
        const metadata = await image
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });

        // 将图像数据转换为Uint8ClampedArray格式供jsQR使用
        const imageData = new Uint8ClampedArray(metadata.data.buffer);

        // 使用jsQR解析二维码
        const code = jsQR(imageData, metadata.info.width, metadata.info.height);

        if (code) {
          results.push({
            url: imageUrl,
            status: 'success',
            format: 'QR_CODE',
            content: code.data,
            timestamp: new Date().toISOString(),
          });
        } else {
          results.push({
            url: imageUrl,
            status: 'error',
            message: 'Failed to decode QR code',
            error: 'No QR code found in image',
          });
        }
      } catch (error: any) {
        results.push({
          url: imageUrl,
          status: 'error',
          message: 'Failed to fetch or process image',
          error: error.message,
        });
      }
    }

    return results;
  }
}
