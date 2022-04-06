import { mockContext, mockHttpEvent } from 'mocks/mockHttpEvent';
import { Container } from 'typedi';
import { httpHandler } from './httpHandler';
import { mockLog } from 'mocks/mockLogger';
import nock from 'nock';

nock.disableNetConnect();

jest.mock('@assetchain/shared', () => ({
  Logger: {
    create: () => mockLog,
  },
}));

const mockResult = { body: 'perfect', status: 200 };

class MockService {
  public async getHealth(): Promise<any> {
    return Promise.resolve(mockResult);
  }
}

describe('httpHandler', () => {
  let callback: () => void;

  beforeEach(() => {
    nock.cleanAll();
    callback = jest.fn();
    Container.set('log', mockLog);
    Container.set(MockService, new MockService());
  });

  it('calls a service method', async () => {
    // arrange
    const testHandler = httpHandler(MockService, service => () =>
      service.getHealth(),
    );

    // act
    const result = await testHandler(mockHttpEvent, mockContext, callback);

    // assert
    expect(result).toBeTruthy();
    if (result) {
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(JSON.stringify(mockResult));
    }
  });

  it('catches exception thrown from within a service method', async () => {
    // arrange
    const testHandler = httpHandler(MockService, service => () => {
      throw new Error('Something bad happened');
    });

    // act
    const result = await testHandler(mockHttpEvent, mockContext, callback);

    // assert
    expect(result).toBeTruthy();
    if (result) {
      expect(result.statusCode).toEqual(500);
      expect(result.body).toEqual('{"error":"Something bad happened"}');
    }
  });
});
