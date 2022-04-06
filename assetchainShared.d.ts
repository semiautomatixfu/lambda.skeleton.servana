///<reference path="node_modules/aws-sdk/index.d.ts"/>
declare module '@assetchain/shared' {
  export interface StoreParameter {
    Type: string;
    Value: any;
    Name: string;
  }
  export interface ParameterDiscoveryServiceOptionsObject {
    stage: string;
    ttl: number;
    fallbackStage: string;
    isFallbackEnabled?: boolean;
    isAutoRefreshEnabled?: boolean;
  }
  export class ParameterDiscoveryService {
    constructor(awsConfig: Object, options: Object);
    get(
      paths: Array<string>,
      options?: ParameterDiscoveryServiceOptionsObject,
      ignoreCache?: boolean,
    ): Promise<Map<string, StoreParameter>>;

    get(
      paths: string,
      options?: ParameterDiscoveryServiceOptionsObject,
      ignoreCache?: boolean,
    ): Promise<StoreParameter>;
  }

  export interface UniversalLogger {
    warn(...args: any[]): void;
    info(...args: any[]): void;
    error(...args: any[]): void;
    debug(...args: any[]): void;
    setMember(...args: any[]): void;
    setAccount(...args: any[]): void;
    meta(...args: any[]): { [key: string]: string };
    setMeta(...args: any[]): void;
    clearMeta(): void;
  }

  export const Logger: {
    create: (params: any) => Promise<UniversalLogger>;
    get: () => UniversalLogger;
    getAll: () => { [key: string]: UniversalLogger };
  };

  export class ExtractHeaders {
    static fromS3Object: Promise<any>;
    static fromSqsMessageAttributes: any;
  }
  export class Context {
    constructor(context: any, config: any);
  }
  export type SupportedService =
    | AWS.SNS
    | AWS.SQS
    | AWS.S3
    | AWS.StepFunctions
    | AWS.Lambda
    | Function;

  export const Correlation: {
    Context: Context;
    ExtractHeaders: ExtractHeaders;
    wrap: (object: SupportedService) => SupportedService;
  };
}
