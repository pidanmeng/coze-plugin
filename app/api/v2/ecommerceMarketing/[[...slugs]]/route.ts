import z from 'zod';
import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { getPrefix } from '@/app/tools/utils/getPrefix';
import { serverTiming } from '@elysiajs/server-timing';
import { EcommerceMarketingService } from '../service';
import { EcommerceMarketingModel, TOOL_NAME } from '../model';

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
    '/kvPoster',
    ({ body }) => {
      return EcommerceMarketingService.kvPoster(body);
    },
    {
      body: EcommerceMarketingModel.kvPosterParams,
    }
  )
  .post(
    '/petPoster',
    ({ body }) => {
      return EcommerceMarketingService.petPoster(body);
    },
    {
      body: EcommerceMarketingModel.petPosterParams,
    }
  )
  .post(
    '/productPoster',
    ({ body }) => {
      return EcommerceMarketingService.productPoster(body);
    },
    {
      body: EcommerceMarketingModel.productPosterParams,
    }
  )
  .post(
    '/xiaohongshuPoster',
    ({ body }) => {
      return EcommerceMarketingService.xiaohongshuPoster(body);
    },
    {
      body: EcommerceMarketingModel.xiaohongshuPosterParams,
    }
  )
  .post(
    '/productImageRetouching',
    ({ body }) => {
      return EcommerceMarketingService.productImageRetouching(body);
    },
    {
      body: EcommerceMarketingModel.productImageRetouchingParams,
    }
  )
  .post(
    '/sceneRendering',
    ({ body }) => {
      return EcommerceMarketingService.sceneRendering(body);
    },
    {
      body: EcommerceMarketingModel.sceneRenderingParams,
    }
  )
  .post(
    '/getImageByUUID',
    ({ body }) => {
      return EcommerceMarketingService.getImageByUUID(body);
    },
    {
      body: EcommerceMarketingModel.getImageByUUIDParams,
    }
  )
  .get('/kvPosterHelper', () => {
    return EcommerceMarketingService.getKvPosterHelper();
  })
  .get('/petPosterHelper', () => {
    return EcommerceMarketingService.getPetPosterHelper();
  })
  .get('/productPosterHelper', () => {
    return EcommerceMarketingService.getProductPosterHelper();
  })
  .get('/xiaohongshuPosterHelper', () => {
    return EcommerceMarketingService.getXiaohongshuPosterHelper();
  });

export const GET = app.fetch;
export const POST = app.fetch;
