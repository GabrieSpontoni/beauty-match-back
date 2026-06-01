import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return `Hello World! - Beauty Match API (${process.env.NODE_ENV ?? 'development'})`;
  }

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
