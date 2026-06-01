import type { IncomingMessage, ServerResponse } from 'http';
import { createNestApp } from '../src/app.factory';

type Handler = (req: IncomingMessage, res: ServerResponse) => void;

let cachedHandler: Handler | null = null;

async function getHandler(): Promise<Handler> {
  if (cachedHandler) {
    return cachedHandler;
  }

  const app = await createNestApp();
  await app.init();

  const instance = app.getHttpAdapter().getInstance();
  cachedHandler = (req, res) => instance(req, res);

  return cachedHandler;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const nestHandler = await getHandler();
  nestHandler(req, res);
}
