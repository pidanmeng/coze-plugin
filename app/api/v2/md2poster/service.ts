import { uploadFile } from '../../../tools/utils/upload';
import satori, { SatoriOptions } from 'satori';
import sharp from 'sharp';
import type { MD2PosterModel } from './model';
import { PosterTemplate } from './template/posterTemplate';
import { loadFonts } from '../../../tools/utils/fontLoader';
import { themes } from './template/themes';

export abstract class MD2PosterService {
  private static defaultSatoriOptions: SatoriOptions = {
    width: 800,
    fonts: [...loadFonts()],
  };

  private static getSatoriOptions(options: Partial<SatoriOptions>) {
    return {
      ...this.defaultSatoriOptions,
      ...options,
    };
  }

  static async generatePoster(args: MD2PosterModel.GeneratePosterParams) {
    try {
      const { width = 800, theme } = args;

      const Element = await PosterTemplate({
        markdown: args.markdown,
        title: args.title,
        theme,
      });

      const svg = await satori(Element, this.getSatoriOptions({ width }));

      console.info('Generated SVG length: ' + svg.length);

      const sharpPNG = await sharp(Buffer.from(svg)).png();
      const uuid = crypto.randomUUID();

      const buffer = await sharpPNG.toBuffer();
      const arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      ) as ArrayBuffer;

      const file = new File([arrayBuffer], `${uuid}.png`, {
        type: 'image/png',
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
}
