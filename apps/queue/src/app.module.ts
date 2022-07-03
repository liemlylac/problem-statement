import { CoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as Joi from 'joi';
import { LoggingInterceptor } from './common/logging.interceptor';
import { ImportModule } from './import/import.module';
import { queueConfigSchema } from './queue-config.schema';

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
    ImportModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
}
