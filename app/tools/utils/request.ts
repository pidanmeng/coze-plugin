import axios, { type AxiosStatic } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

let axiosRef: AxiosStatic;

export function setupAxios() {
  const proxyUrl = process.env.PROXY_URL || '';
  const isProduction = process.env.NODE_ENV === 'production';

  if (proxyUrl && !isProduction) {
    const agent = new HttpsProxyAgent(proxyUrl);
    axios.defaults.httpsAgent = agent;
  }

  return axios;
}

export function getAxios() {
  if (!axiosRef) {
    axiosRef = setupAxios();
  }

  return axiosRef;
}
