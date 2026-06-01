import { setupTestEnv } from './app.setup';

describe('setupTestEnv', () => {
  it('should set node env to test', () => {
    setupTestEnv();

    expect(process.env.NODE_ENV).toBe('test');
  });
});
