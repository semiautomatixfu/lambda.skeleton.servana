import { APIGatewayEvent } from 'aws-lambda';
import { Service } from 'typedi';

export interface ExampleState {
  example: string;
}

@Service()
export class ExampleService {
  public async stepHandler(state: ExampleState) {
    // do nothing...
  }

  public async httpHandler(state: APIGatewayEvent) {
    // do nothing...
    return {
      hello: 'world',
    };
  }
}
