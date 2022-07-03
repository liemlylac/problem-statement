import { CoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import * as Joi from 'joi';
import { HttpExceptionFilter, LoggingInterceptor } from './common';
import { ExecutionModule } from './execution/execution.module';
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
    CoreModule,
    QueueModule,
    TransactionModule,
    ExecutionModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
}
