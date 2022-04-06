import { Constructable, Container } from 'typedi';
import { Logger } from '@assetchain/shared';

export type LambdaStepFunction<S, R = S> = (state: S) => Promise<void | R>;

export function stepFunctionHandler<T, S, R = S>(
  serviceType: Constructable<T>,
  stepFunction: (service: any) => LambdaStepFunction<S, R>,
): (state: any, context: any) => Promise<void | R> {
  return async (state, context) => {
    const scopedContainer = Container.of(context.invokeid);
    const log = await Logger.create({ context, event: state });
    scopedContainer.set('log', log);
    try {
      const service = scopedContainer.get(serviceType);
      return await stepFunction(service)(state);
    } finally {
      Container.reset(context.invokeid);
    }
  };
}
