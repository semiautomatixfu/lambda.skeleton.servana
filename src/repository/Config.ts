import { Service } from 'typedi';

@Service({ global: true })
export class Config {
  public static readonly X_IDENTITY_ID_INTERNAL: string = 'ADMIN';
  public static readonly X_IDENTITY_ROLE_INTERNAL: string = 'INTERNAL';
  public static readonly X_IDENTITY_ROLE_MEMBER: string = 'MEMBER';

  public readonly region: string;
  public readonly stage: string;
  public readonly apiManageBaseUrl: string;

  constructor(region?: string, stage?: string, apiManageBaseUrl?: string) {
    this.region = region || process.env.REGION || '';
    this.stage = stage || process.env.STAGE || '';
    this.apiManageBaseUrl =
      apiManageBaseUrl || process.env.MANAGE_API_BASE_URL || '';
  }
}
