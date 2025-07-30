'use server';

import { getAxios } from '../utils/request';

const axios = getAxios();

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const USER_AGENT = process.env.REDDIT_USER_AGENT;

let accessToken: null | string = null;
let tokenExpiry = 0;

export async function getAccessToken() {
  const now = Date.now();
  if (accessToken && tokenExpiry > now) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`
          ).toString('base64')}`,
          'User-Agent': USER_AGENT,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP 错误: ${response.status}`);
    }

    const data = response.data;
    accessToken = data.access_token;
    tokenExpiry = now + data.expires_in * 1000;

    return {
      accessToken,
      tokenExpiry,
    };
  } catch (error) {
    return {
      message: error,
    };
  }
}
