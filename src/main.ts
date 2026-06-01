import { createNestApp } from './app.factory';

async function bootstrap() {
  const app = await createNestApp();

  await app.listen(process.env.PORT ?? 3001);

  const appUrl = await app.getUrl();
  const { port } = new URL(appUrl);
  const localhostUrl = `http://localhost:${port}`;
  // Loga endpoints principais para facilitar validacao local e em deploy.

  console.log(`[beauty-match-back] API: ${localhostUrl}/api`);

  console.log(`[beauty-match-back] Swagger: ${localhostUrl}/api/docs`);
}

void bootstrap();
