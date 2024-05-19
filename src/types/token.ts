export interface IApiToken {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope: string;
}
