import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { serverTiming } from '@elysiajs/server-timing';
import { getPrefix } from '@/app/tools/utils/getPrefix';
import z from 'zod';
import { PhotoStudioModel, TOOL_NAME } from '../model';
import { PhotoStudioService } from '../service';

const app = new Elysia({ prefix: getPrefix(TOOL_NAME) })
  .use(
    openapi({
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    })
  )
  .use(serverTiming())
  .post(
    '/changeClothes',
    ({ body }) => {
      return PhotoStudioService.changeClothes(body);
    },
    {
      body: PhotoStudioModel.changeClothesParams,
    }
  )
  .post(
    '/idPhoto',
    ({ body }) => {
      return PhotoStudioService.idPhoto(body);
    },
    {
      body: PhotoStudioModel.idPhotoParams,
    }
  )
  .post(
    '/oldPhotoRestoration',
    ({ body }) => {
      return PhotoStudioService.oldPhotoRestoration(body);
    },
    {
      body: PhotoStudioModel.oldPhotoRestorationParams,
    }
  )
  .post(
    '/petOutfitChange',
    ({ body }) => {
      return PhotoStudioService.petOutfitChange(body);
    },
    {
      body: PhotoStudioModel.petOutfitChangeParams,
    }
  )
  .post(
    '/portraitRetouching',
    ({ body }) => {
      return PhotoStudioService.portraitRetouching(body);
    },
    {
      body: PhotoStudioModel.portraitRetouchingParams,
    }
  )
  .post(
    '/productImageRetouching',
    ({ body }) => {
      return PhotoStudioService.productImageRetouching(body);
    },
    {
      body: PhotoStudioModel.productImageRetouchingParams,
    }
  )
  .post(
    '/textureEnhancement',
    ({ body }) => {
      return PhotoStudioService.textureEnhancement(body);
    },
    {
      body: PhotoStudioModel.textureEnhancementParams,
    }
  );

export const GET = app.fetch;
export const POST = app.fetch;
