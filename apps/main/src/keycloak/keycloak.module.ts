import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakConfigService } from './keycloak.config.service';
import { KeycloakService } from './keycloak.service';

@Global()
@Module({
  imports: [
    HttpModule,
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      useClass: KeycloakConfigService,
    }),
  ],
  providers: [KeycloakConfigService, KeycloakService],
  exports: [KeycloakConnectModule, KeycloakService],
})
export class KeycloakModule {
}
