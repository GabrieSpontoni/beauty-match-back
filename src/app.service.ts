import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      name: 'beauty-match-back',
      status: 'ok',
    };
  }

  getInfo() {
    return {
      message: 'Integracao front-back funcionando',
    };
  }
}
