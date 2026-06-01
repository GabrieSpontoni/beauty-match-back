import { ValidationPipe } from '@nestjs/common';
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
    createDocument: jest.fn().mockReturnValue({}),
    setup: jest.fn(),
  },
}));

describe('createNestApp', () => {
  it('should configure app with prefix, validation and swagger', async () => {
    const setGlobalPrefix = jest.fn();
    const useGlobalPipes = jest.fn();

    (NestFactory.create as jest.Mock).mockResolvedValue({
      setGlobalPrefix,
      useGlobalPipes,
    });

    const app = await createNestApp();

    expect(NestFactory.create).toHaveBeenCalledTimes(1);
    expect(setGlobalPrefix).toHaveBeenCalledWith('api');

    expect(useGlobalPipes).toHaveBeenCalledTimes(1);
    const [pipeArg] = useGlobalPipes.mock.calls[0] as [ValidationPipe];
    expect(pipeArg).toBeInstanceOf(ValidationPipe);

    expect(SwaggerModule.setup).toHaveBeenCalledWith(
      'api/docs',
      expect.anything(),
      expect.any(Function),
    );
    const setupCall = (SwaggerModule.setup as jest.Mock).mock.calls[0] as [
      string,
      unknown,
      () => unknown,
    ];
    const documentFactory = setupCall[2];
    documentFactory();
    expect(SwaggerModule.createDocument).toHaveBeenCalledTimes(1);

    expect(app).toEqual({
      setGlobalPrefix,
      useGlobalPipes,
    });
  });
});
