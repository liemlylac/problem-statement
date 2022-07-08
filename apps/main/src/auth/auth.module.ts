import { Module } from '@nestjs/common';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [KeycloakModule],
  controllers: [AuthController],
})
export class AuthModule {}