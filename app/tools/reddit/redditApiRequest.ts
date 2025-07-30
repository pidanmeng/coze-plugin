import { getAxios } from '../utils/request';
import { getAccessToken } from './getAccessToken';

export async function redditApiRequest(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const axios = getAxios();
  try {
    const token = await getAccessToken();
    let url = `https://oauth.reddit.com${endpoint}`;

    // 添加查询参数
    if (Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value);
      }
      url += `?${queryParams.toString()}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': process.env.REDDIT_USER_AGENT || '',
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP 错误: ${response.status}`);
    }

    return await response.data;
  } catch (error) {
    console.error(`发送 Reddit API 请求到 ${endpoint} 失败:`, error);
    throw error;
  }
}
