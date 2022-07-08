import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private readonly config: ConfigService) {
  }

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: `${this.config.get('KEYCLOAK_SERVER_URL')}/auth`, // TODO review this postfix or keep it
      realm: this.config.get('KEYCLOAK_REALM_NAME'),
      clientId: this.config.get('KEYCLOAK_CLIENT_ID'),
      secret: this.config.get('KEYCLOAK_CLIENT_SECRET'),
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.OFFLINE,
    }
  }
}
