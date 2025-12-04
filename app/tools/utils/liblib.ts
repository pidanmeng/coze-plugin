import { createHmac } from 'crypto';

const BASE_URL = 'https://openapi.liblibai.cloud';

interface SignatureResult {
  signature: string;
  timestamp: number;
  signatureNonce: string;
}

type ParamsInput = {
  class_type: string;
  inputs: Record<string, string | number | boolean>;
};

export type GenerateParams = {
  workflowUuid: string;
  [nodeId: string]: ParamsInput | string;
};

interface LibLibStatusResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

export interface ImageInfo {
  auditStatus: number;
  imageUrl: string;
  nodeId: string;
  outputName: string;
}

export interface GenerateStatusResult {
  accountBalance?: number;
  generateStatus?: number;
  generateUuid: string;
  images?: ImageInfo[];
  percentCompleted?: number;
  pointsCost?: number;
  videos?: any[];
  generateMsg?: string;
}

export interface AdditionalNetwork {
  modelId: string;
  weight: number; // lora权重，范围 -4.0 ~ +4.0
}

export interface TextToImageParams {
  // 必填参数
  prompt: string;
  // 可选参数 (允许用户传入)
  negativePrompt?: string;
  width?: number;
  height?: number;
  // Lora添加，最多5个
  additionalNetwork?: AdditionalNetwork[];
  enable8Steps?: boolean;
}

export interface ImageToImageParams {
  // 必填参数
  image: string;
  // 可选参数 (允许用户传入)
  prompt?: string;
  negativePrompt?: string;
  // Lora添加，最多5个
  additionalNetwork?: AdditionalNetwork[];
}

interface TextToImageResponse {
  code: number;
  data: {
    generateUuid: string;
  };
  msg: string;
}

function generateSignature(url: string, secretKey: string): SignatureResult {
  const timestamp = Date.now();
  const signatureNonce = Math.random().toString(36).substring(2, 18);
  const str = `${url}&${timestamp}&${signatureNonce}`;
  const hmac = createHmac('sha1', secretKey);
  hmac.update(str);
  const hash = hmac.digest('base64');
  const signature = hash
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return { signature, timestamp, signatureNonce };
}

function buildAuthUrl(path: string, accessKey: string, secretKey: string) {
  const { signature, timestamp, signatureNonce } = generateSignature(
    path,
    secretKey
  );
  const params = new URLSearchParams({
    AccessKey: accessKey,
    Signature: signature,
    Timestamp: timestamp.toString(),
    SignatureNonce: signatureNonce,
  });
  return `${BASE_URL}${path}?${params.toString()}`;
}

export async function queryLibLibImageStatus(
  generateUuid: string
): Promise<GenerateStatusResult> {
  const accessKey = process.env.LIB_ACCESS_KEY;
  const secretKey = process.env.LIB_SECRET_KEY;
  if (!accessKey || !secretKey) {
    throw new Error(
      'Missing LIB_ACCESS_KEY or LIB_SECRET_KEY environment variables'
    );
  }

  const path = '/api/generate/comfy/status';
  const authUrl = buildAuthUrl(path, accessKey, secretKey);

  console.info('Querying LibLib status', { generateUuid });

  const res = await fetch(authUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ generateUuid }),
  });

  const result =
    (await res.json()) as LibLibStatusResponse<GenerateStatusResult>;
  if (result.code !== 0) {
    throw new Error(`API Error: ${result.msg}`);
  }
  return result.data;
}

/**
 * 发起工作流并轮询直到完成或失败。返回包含图片 URL 的对象或抛出错误。
 */
export async function invokeLibLibWorkflow<T extends GenerateParams>(request: {
  templateUuid: string;
  generateParams: T;
}) {
  try {
    const { templateUuid, generateParams } = request;
    const accessKey = process.env.LIB_ACCESS_KEY;
    const secretKey = process.env.LIB_SECRET_KEY;
    if (!accessKey || !secretKey) {
      throw new Error(
        'Missing LIB_ACCESS_KEY or LIB_SECRET_KEY environment variables'
      );
    }

    const path = '/api/generate/comfyui/app';
    const authUrl = buildAuthUrl(path, accessKey, secretKey);

    console.info('Invoking LibLib workflow', { templateUuid });

    const response = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateUuid, generateParams }),
    });

    const result =
      (await response.json()) as LibLibStatusResponse<GenerateStatusResult>;
    if (result.code !== 0 || !result.data) {
      throw new Error(`API Error: ${result.msg}`);
    }

    const generateUuid = result.data.generateUuid;
    console.info('Workflow started, generateUuid=', generateUuid);

    return {
      generateUuid,
    };
  } catch (error) {
    console.error('Failed to invoke workflow', {
      error: (error as Error).message,
    });
    throw new Error(`Failed to invoke workflow: ${error as string}`);
  }
}

/**
 *  使用千问模型调用文生图接口
 * @param request 请求参数
 * @returns Promise<string> 返回生成任务的UUID
 */
export async function invokeTextToImageByQwen(
  params: TextToImageParams
): Promise<GenerateStatusResult> {
  try {
    // 从环境变量获取认证信息
    const accessKey = process.env.LIB_ACCESS_KEY;
    const secretKey = process.env.LIB_SECRET_KEY;

    if (!accessKey || !secretKey) {
      throw new Error(
        'Missing LIB_ACCESS_KEY or LIB_SECRET_KEY environment variables'
      );
    }

    // 构建完整的参数对象，仅允许特定参数由用户传入，其余使用固定默认值
    const finalParams = {
      checkPointId: '75e0be0c93b34dd8baeec9c968013e0c',
      prompt: params.prompt,
      negativePrompt:
        params.negativePrompt ||
        'ng_deepnegative_v1_75t,(badhandv4:1.2),EasyNegative,(worst quality:2),nsfw',
      clipSkip: 2,
      sampler: 1,
      steps: params.enable8Steps ? 8 : 30,
      cfgScale: 4.0,
      width: params.width || 768,
      height: params.height || 1024,
      imgCount: 1,
      randnSource: 0,
      seed: -1,
      additionalNetwork: [
        ...(params.additionalNetwork ? params.additionalNetwork : []),
        ...(params.enable8Steps
          ? [{ modelId: 'f482cb13b2ba476d9d954d09d617259f', weight: 0.4 }]
          : []),
      ],
    };

    // 构建带认证参数的URL
    const path = '/api/generate/webui/text2img';
    const authUrl = buildAuthUrl(path, accessKey, secretKey);
    const body = {
      templateUuid: 'bf085132c7134622895b783b520b39ff',
      generateParams: finalParams,
    };

    console.info('authUrl', authUrl);
    console.info('body', JSON.stringify(body));

    // 发送请求
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = (await response.json()) as TextToImageResponse;
    console.info('Text to image invoked successfully', {
      statusCode: response.status,
      result: String(result),
    });

    if (result.code !== 0 || !result.data) {
      throw new Error(`API Error: ${result.msg}`);
    }

    const generateUuid = result.data.generateUuid;
    // 在拿到 uuid 后轮询直至完成并返回最终结果
    return {
      generateUuid,
    };
  } catch (error) {
    console.error('Failed to invoke text to image', {
      error: (error as Error).message,
    });
    throw new Error(`Failed to invoke text to image: ${error as string}`);
  }
}

/**
 *  使用千问模型调用文生图接口
 * @param request 请求参数
 * @returns Promise<string> 返回生成任务的UUID
 */
export async function invokeImageToImageByQwen(
  params: ImageToImageParams
): Promise<GenerateStatusResult> {
  try {
    // 从环境变量获取认证信息
    const accessKey = process.env.LIB_ACCESS_KEY;
    const secretKey = process.env.LIB_SECRET_KEY;

    if (!accessKey || !secretKey) {
      throw new Error(
        'Missing LIB_ACCESS_KEY or LIB_SECRET_KEY environment variables'
      );
    }

    // 构建完整的参数对象，仅允许特定参数由用户传入，其余使用固定默认值
    const finalParams = {
      checkPointId: '45d98dd4c68941bbb6236f29778c4c9f',
      prompt: params.prompt,
      negativePrompt:
        params.negativePrompt ||
        'ng_deepnegative_v1_75t,(badhandv4:1.2),EasyNegative,(worst quality:2),nsfw',
      clipSkip: 2,
      sampler: 1,
      steps: 20,
      cfgScale: 4.0,
      imgCount: 1,
      randnSource: 0,
      restoreFaces: 0, // 面部修复，0关闭，1开启
      seed: -1,
      // 图像相关参数
      sourceImage: params.image,
      resizeMode: 2, // 缩放模式， 0 拉伸，1 裁剪，2 填充
      resizedWidth: 1024, // 图像缩放后的宽度
      resizedHeight: 1536, // 图像缩放后的高度
      mode: 0, // 0图生图，4局部重绘
      denoisingStrength: 0.75, // 重绘幅度
      additionalNetwork: [
        ...(params.additionalNetwork ? params.additionalNetwork : []),
      ],
    };

    // 构建带认证参数的URL
    const path = '/api/generate/webui/img2img';
    const authUrl = buildAuthUrl(path, accessKey, secretKey);
    const body = {
      templateUuid: '63b72710c9574457ba303d9d9b8df8bd',
      generateParams: finalParams,
    };

    console.info('authUrl', authUrl);
    console.info('body', JSON.stringify(body));

    // 发送请求
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = (await response.json()) as TextToImageResponse;
    console.info('Text to image invoked successfully', {
      statusCode: response.status,
      result: String(result),
    });

    if (result.code !== 0 || !result.data) {
      throw new Error(`API Error: ${result.msg}`);
    }

    const generateUuid = result.data.generateUuid;
    // 在拿到 uuid 后轮询直至完成并返回最终结果
    return {
      generateUuid,
    };
  } catch (error) {
    console.error('Failed to invoke image to image', {
      error: (error as Error).message,
    });
    throw new Error(`Failed to invoke image to image: ${error as string}`);
  }
}

/**
 * 通用轮询函数：根据 generateUuid 轮询生成状态，直到成功或失败后返回最终结果。
 */
export async function pollGenerateResult(
  generateUuid: string,
  opts?: { pollIntervalMs?: number; maxAttempts?: number }
): Promise<GenerateStatusResult> {
  const pollIntervalMs = opts?.pollIntervalMs ?? 2000;
  const maxAttempts = opts?.maxAttempts ?? 300;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const status = await queryLibLibImageStatus(generateUuid);
      console.info('Polled status', {
        attempt,
        generateUuid,
        status: status.generateStatus,
        percent: status.percentCompleted,
      });

      if (status.generateStatus == 5) {
        const images =
          status.images?.map((i) => i.imageUrl).filter(Boolean) ?? [];
        if (images.length === 0) {
          throw new Error('Task succeeded but no images returned');
        }
        return {
          accountBalance: status.accountBalance,
          generateStatus: status.generateStatus,
          generateUuid: status.generateUuid,
          images: status.images ?? [],
          percentCompleted: status.percentCompleted,
          pointsCost: status.pointsCost,
          videos: status.videos ?? [],
          generateMsg: status.generateMsg,
        } as GenerateStatusResult;
      }

      if (status.generateStatus == 6) {
        throw new Error(status.generateMsg || 'Image generation failed');
      }

      await new Promise((r) => setTimeout(r, pollIntervalMs));
    } catch (err) {
      if (attempt === maxAttempts - 1) {
        console.error('Polling failed/timeout', {
          generateUuid,
          error: err instanceof Error ? err.message : String(err),
        });
        throw err;
      }
      return {
        generateUuid,
        generateMsg: err instanceof Error ? err.message : String(err),
      };
    }
  }

  throw new Error('Polling timed out waiting for image generation');
}

export default {};
