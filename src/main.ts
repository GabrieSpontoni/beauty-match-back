import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Beauty Match API')
    .setDescription('Base API com NestJS para o projeto Beauty Match')
    .setVersion('1.0.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001);

  const appUrl = await app.getUrl();
  const { port } = new URL(appUrl);
  const localhostUrl = `http://localhost:${port}`;
  // Loga endpoints principais para facilitar validacao local e em deploy.

  console.log(`[beauty-match-back] API: ${localhostUrl}/api`);

  console.log(`[beauty-match-back] Swagger: ${localhostUrl}/api/docs`);
}

void bootstrap();
