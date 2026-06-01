import { AppService } from './app.service';

describe('AppService', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('should return hello with node env when defined', () => {
    process.env.NODE_ENV = 'test';
    const service = new AppService();

    expect(service.getHello()).toBe('Hello World! - Beauty Match API (test)');
  });

  it('should return hello with development fallback when node env is undefined', () => {
    delete process.env.NODE_ENV;
    const service = new AppService();

    expect(service.getHello()).toBe(
      'Hello World! - Beauty Match API (development)',
    );
  });
});
