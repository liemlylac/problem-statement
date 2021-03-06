import { CoreModule } from '@app/core';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import * as Joi from 'joi';
import { diskStorage } from 'multer';
import { AppController } from './app.controller';
import { appProviders } from './app.providers';
import { AuthModule } from './auth/auth.module';
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
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        //dest: configService.get('MULTER_DEST') || './upload',
        storage: diskStorage({
          destination: configService.get('MULTER_DEST') || './upload',
        }),
        limits: {
          fileSize: 8000000 , // limit of 8MB
        }
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    CoreModule,
    QueueModule,
    KeycloakModule,
    AuthModule,
    TransactionModule,
    ExecutionModule,
  ],
  controllers: [AppController],
  providers: [
    ...appProviders,
  ],
})
export class AppModule {
}
