import { ValidationPipe } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { createNestApp } from './app.factory';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

jest.mock('@nestjs/swagger', () => ({
  DocumentBuilder: jest.fn().mockImplementation(() => ({
    setTitle: jest.fn().mockReturnThis(),
    setDescription: jest.fn().mockReturnThis(),
    setVersion: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnValue({ openapi: '3.0.0' }),
  })),
  SwaggerModule: {
    createDocument: jest.fn().mockReturnValue({ openapi: '3.0.0' }),
    setup: jest.fn(),
  },
}));

describe('createNestApp', () => {
  it('should configure app with prefix, validation and swagger', async () => {
    const setGlobalPrefix = jest.fn();
    const useGlobalPipes = jest.fn();
    const useStaticAssets = jest.fn();
    const use = jest.fn();

    (NestFactory.create as jest.Mock).mockResolvedValue({
      setGlobalPrefix,
      useGlobalPipes,
      useStaticAssets,
      use,
    });

    const app = await createNestApp();

    expect(NestFactory.create).toHaveBeenCalledTimes(1);
    expect(setGlobalPrefix).toHaveBeenCalledWith(
      'api',
      expect.objectContaining({
        exclude: [{ path: '/', method: RequestMethod.GET }],
      }),
    );

    expect(useGlobalPipes).toHaveBeenCalledTimes(1);
    const [pipeArg] = useGlobalPipes.mock.calls[0] as [ValidationPipe];
    expect(pipeArg).toBeInstanceOf(ValidationPipe);

    expect(useStaticAssets).toHaveBeenCalledTimes(1);
    expect(use).toHaveBeenCalledWith('/api/docs-json', expect.any(Function));
    const docsJsonHandler = (
      use.mock.calls[0] as [string, (...args: unknown[]) => void]
    )[1];
    const json = jest.fn();
    docsJsonHandler({}, { json });
    expect(json).toHaveBeenCalledWith({ openapi: '3.0.0' });

    expect(SwaggerModule.setup).toHaveBeenCalledWith(
      'api/docs',
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        swaggerOptions: { url: '/api/docs-json' },
      }),
    );
    expect(SwaggerModule.createDocument).toHaveBeenCalledTimes(1);

    expect(app).toEqual({
      setGlobalPrefix,
      useGlobalPipes,
      useStaticAssets,
      use,
    });
  });
});
