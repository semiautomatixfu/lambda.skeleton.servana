import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { Constructable, Container } from 'typedi';
import HttpStatus from 'http-status-codes';
import { Logger } from '@assetchain/shared';
import { Settings } from 'luxon';

export interface WarmupEvent {
  source: 'serverless-plugin-warmup';
}

function isWarmupEvent(
  event: APIGatewayEvent | WarmupEvent,
): event is WarmupEvent {
  return (<WarmupEvent>event).source === 'serverless-plugin-warmup';
}

export type LambdaHttpFunction = (
  event: APIGatewayEvent | WarmupEvent,
  context: Context,
) => void | Promise<APIGatewayProxyResult>;

export function httpHandler<T>(
  serviceType: Constructable<T>,
  httpFunction: (service: any) => LambdaHttpFunction,
): APIGatewayProxyHandler {
  return async (
    event: APIGatewayEvent | WarmupEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    if (isWarmupEvent(event)) {
      console.log({ message: 'Just keeping things warm' });
      // Slight delay for concurrency
      await new Promise(r => setTimeout(r, 25));
      return {
        body: '',
        statusCode: HttpStatus.OK,
      };
    }

    const scopedContainer = Container.of(event.requestContext.requestId);

    const log = await Logger.create({ context, event });
    scopedContainer.set('log', log);
    scopedContainer.set('cognitoIdentity', event.requestContext.identity);

    // TODO: read client timezone from request
    Settings.defaultZoneName = 'Australia/Brisbane';

    try {
      const service = scopedContainer.get(serviceType);

      log.info({ event, message: 'got event' });
      const result = await httpFunction(service)(event, context);

      return {
        body: JSON.stringify(result),
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      log.warn({
        error: error.message,
        message: 'Uncaught error',
        stack: error.stack,
      });
      return {
        body: JSON.stringify({ error: error.message }),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    } finally {
      Container.reset(event.requestContext.requestId);
    }
  };
}
