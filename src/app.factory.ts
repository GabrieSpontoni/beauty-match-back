import { ValidationPipe } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

export async function createNestApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
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

  const document = SwaggerModule.createDocument(app, config);

  app.useStaticAssets(
    join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
    {
      prefix: '/swagger-assets',
    },
  );

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { url: '/api/docs-json' },
    customSiteTitle: 'Beauty Match API Docs',
    customJs: '/swagger-assets/swagger-ui-bundle.js',
    customCssUrl: '/swagger-assets/swagger-ui.css',
  });

  app.use('/api/docs-json', (_req: Request, res: Response) =>
    res.json(document),
  );

  return app;
}
