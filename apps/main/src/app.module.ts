import { CoreModule } from '@app/core';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { appProviders } from './app.providers';
import { ExecutionModule } from './execution/execution.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import { mainConfigSchema } from './main-config.schema';
import { QueueModule } from './queue/queue.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({ ...mainConfigSchema }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      }
    }),
    HttpModule,
    CoreModule,
    QueueModule,
    KeycloakModule,
    TransactionModule,
    ExecutionModule,
  ],
  providers: [
    ...appProviders,
  ],
})
export class AppModule {
}
