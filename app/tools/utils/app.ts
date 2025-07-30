import { Hono } from 'hono';

let app: Hono;
export function getApp() {
  if (!app) {
    app = new Hono().basePath('/api');
  }

  return app;
}
