import { Elysia, sse } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { serverTiming } from '@elysiajs/server-timing';

const app = new Elysia({ prefix: '/api/v2/demo' })
  .use(openapi())
  .use(serverTiming())
  .get('/', () => 'Hello World')
  .post('/', () => 'Hello World')
  .put('/', () => 'Hello World')
  .delete('/', () => 'Hello World')
  .get('/sse', async function* () {
    yield sse('hello world');
    yield sse({
      event: 'message',
      data: {
        message: 'This is a message',
        timestamp: new Date().toISOString(),
      },
    });
  });

export const GET = app.fetch;
export const POST = app.fetch;
