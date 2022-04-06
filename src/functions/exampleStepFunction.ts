import 'reflect-metadata';
import { ExampleService, ExampleState } from 'service/ExampleService';
import { stepFunctionHandler } from 'handlers/stepFunctionHandler';

export const handler = stepFunctionHandler(
  ExampleService,
  (service: ExampleService): any => async (state: ExampleState) =>
    service.stepHandler(state),
);
