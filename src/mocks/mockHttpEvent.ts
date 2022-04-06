import {
  APIGatewayEvent,
  APIGatewayEventRequestContext,
  Context,
} from 'aws-lambda';

export const mockContext: Context = {
  awsRequestId: '',
  callbackWaitsForEmptyEventLoop: false,
  done: jest.fn(),
  fail: jest.fn(),
  functionName: '',
  functionVersion: '',
  getRemainingTimeInMillis: jest.fn(),
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: '0',

  succeed: jest.fn(),
};

export const mockRequestContext: APIGatewayEventRequestContext = {
  accountId: '123',
  apiId: '123',
  authorizer: { foo: 'bar' },
  httpMethod: 'get',
  identity: {
    accessKey: null,
    accountId: null,
    apiKey: null,
    apiKeyId: null,
    caller: null,
    cognitoAuthenticationProvider: null,
    cognitoAuthenticationType: null,
    cognitoIdentityId: null,
    cognitoIdentityPoolId: null,
    principalOrgId: null,
    sourceIp: 'localhost',
    user: null,
    userAgent: null,
    userArn: null,
  },
  path: 'health',
  protocol: 'http',
  requestId: '123',
  requestTimeEpoch: 0,
  resourceId: '123',
  resourcePath: 'biller',
  stage: 'test',
};

export const mockHttpEvent: APIGatewayEvent = {
  body: null,
  headers: {},
  httpMethod: 'GET',
  isBase64Encoded: false,
  multiValueHeaders: {},
  multiValueQueryStringParameters: null,
  path: 'health',
  pathParameters: null,
  queryStringParameters: null,
  requestContext: mockRequestContext,
  resource: 'resource',
  stageVariables: null,
};
