import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return api health payload', () => {
    expect(appController.getHealth()).toEqual({
      name: 'beauty-match-back',
      status: 'ok',
    });
  });

  it('should return api info payload', () => {
    expect(appController.getInfo()).toEqual({
      message: 'Integracao front-back funcionando',
    });
  });
});
