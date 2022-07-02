import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { queueConfigSchema } from './queue-config.schema';
import { TransactionModule } from './transaction/transaction.module';
import { LoggingInterceptor } from './common/logging.interceptor';
import { CoreModule } from '@app/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({ ...queueConfigSchema }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    CoreModule,
    TransactionModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule {}
