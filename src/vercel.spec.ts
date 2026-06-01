import type { IncomingMessage, ServerResponse } from 'http';

const createNestAppMock = jest.fn();

jest.mock('./app.factory', () => ({
  createNestApp: () => createNestAppMock(),
}));

describe('vercel handler', () => {
  beforeEach(() => {
    jest.resetModules();
    createNestAppMock.mockReset();
  });

  it('should bootstrap once and reuse server handler', async () => {
    const instanceHandler = jest.fn();
    const init = jest.fn().mockResolvedValue(undefined);
    const getHttpAdapter = jest.fn().mockReturnValue({
      getInstance: () => instanceHandler,
    });

    createNestAppMock.mockResolvedValue({
      init,
      getHttpAdapter,
    });

    const { default: handler } = await import('./vercel');

    const req1 = {} as IncomingMessage;
    const res1 = {} as ServerResponse;
    const req2 = {} as IncomingMessage;
    const res2 = {} as ServerResponse;

    await handler(req1, res1);
    await handler(req2, res2);

    expect(createNestAppMock).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledTimes(1);
    expect(getHttpAdapter).toHaveBeenCalledTimes(1);
    expect(instanceHandler).toHaveBeenCalledTimes(2);
    expect(instanceHandler).toHaveBeenNthCalledWith(1, req1, res1);
    expect(instanceHandler).toHaveBeenNthCalledWith(2, req2, res2);
  });
});
