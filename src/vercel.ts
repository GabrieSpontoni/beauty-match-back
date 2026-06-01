import type { IncomingMessage, ServerResponse } from 'http';
import { createNestApp } from './app.factory';

type NodeHandler = (req: IncomingMessage, res: ServerResponse) => void;
let server: NodeHandler | undefined;

async function bootstrap(): Promise<NodeHandler> {
  const app = await createNestApp();
  await app.init();

  return app.getHttpAdapter().getInstance();
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (!server) {
    server = await bootstrap();
  }

  server(req, res);
}
