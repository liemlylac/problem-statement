import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface KeycloakConfig {
  serverUrl: string;
  realName: string;
  clientId: string;
  clientSecret: string;
}

@Injectable()
export class KeycloakService {
  keycloakConfig: KeycloakConfig;
  constructor(
   private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {
    this.keycloakConfig = this.getKeycloakConfig();
  }

  protected getKeycloakConfig(): KeycloakConfig {
    return {
      serverUrl: this.config.get('KEYCLOAK_SERVER_URL'),
      realName: this.config.get('KEYCLOAK_REALM_NAME'),
      clientId: this.config.get('KEYCLOAK_CLIENT_ID'),
      clientSecret: this.config.get('KEYCLOAK_CLIENT_SECRET'),
    }
  }

  protected getHttpConfig() {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
  }

  login(login: { username: string, password: string}) {
    const url = `${this.keycloakConfig.serverUrl}/auth/realms/${this.keycloakConfig.realName}/protocol/openid-connect/token`;
    const data = new URLSearchParams({
      client_id: this.keycloakConfig.clientId,
      client_secret: this.keycloakConfig.clientSecret,
      username: login.username,
      password: login.password,
      grant_type: 'password',
    }).toString();
    return this.http.post(url, data, this.getHttpConfig()).toPromise();
  }
}