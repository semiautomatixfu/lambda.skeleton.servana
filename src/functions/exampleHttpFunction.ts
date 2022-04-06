import 'reflect-metadata';
import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { ExampleService } from 'service/ExampleService';
import { httpHandler } from 'handlers/httpHandler';

export const handler: APIGatewayProxyHandler = httpHandler(
  ExampleService,
  (service: ExampleService): any => async (event: APIGatewayEvent) =>
    service.httpHandler(event),
);
