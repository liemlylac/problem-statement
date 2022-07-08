import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { KeycloakConfig, KeycloakLoginOptions, KeycloakLoginResult } from './keycloak.interface';

@Injectable()
export class KeycloakService {
  keycloakConfig: KeycloakConfig;
  constructor(
   private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {
    this.keycloakConfig = {
      serverUrl: this.config.get('KEYCLOAK_SERVER_URL'),
      realName: this.config.get('KEYCLOAK_REALM_NAME'),
      clientId: this.config.get('KEYCLOAK_CLIENT_ID'),
      clientSecret: this.config.get('KEYCLOAK_CLIENT_SECRET'),
    };
  }

  /**
   * Generate http request config with default value
   *
   * @param optional Overriding value
   * @protected
   */
  protected getHttpConfig(optional?: object) {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...optional,
    };
  }

  /**
   * Keycloak Login Service
   *
   * @param login Login options for Keycloak
   */
  login(login: KeycloakLoginOptions): Promise<AxiosResponse<KeycloakLoginResult>> {
    const url = `${this.keycloakConfig.serverUrl}/auth/realms/${this.keycloakConfig.realName}/protocol/openid-connect/token`;
    const data = new URLSearchParams({
      client_id: this.keycloakConfig.clientId,
      client_secret: this.keycloakConfig.clientSecret,
      username: login.username,
      password: login.password,
      grant_type: 'password',
    }).toString();
    return firstValueFrom(this.http.post(url, data, this.getHttpConfig()));
  }
}