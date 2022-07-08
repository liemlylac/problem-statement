export interface KeycloakConfig {
  serverUrl: string;
  realName: string;
  clientId: string;
  clientSecret: string;
}

export interface KeycloakLoginOptions {
  username: string;
  password: string;
}

export interface KeycloakLoginResult {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}

export interface KeycloakRefreshTokenOptions {
  refreshToken: string;
}

export interface KeycloakRefreshTokenResult {
  access_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string
}
