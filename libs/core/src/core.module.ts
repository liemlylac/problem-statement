import { ExecuteService } from '@app/core/services/execute.service';
import { JobSubscriber } from '@app/core/subscribers/job.subscriber';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { coreConfigSchema } from './core-config.schema';
import { CoreService } from './core.service';
import { Execution } from './entities/execution.entity';
import { Job } from './entities/job.entity';
import { Transaction } from './entities/transaction.entity';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({ ...coreConfigSchema }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      extraProviders: [CoreService],
      inject: [CoreService],
      useFactory: (core: CoreService) => {
        const config = core.getDatabaseConfig();
        return {
          type: 'mysql',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          entities: [join(__dirname, '**','*.entity.{ts,js}')],
          subscribers: [join(__dirname, '**', '*.subscriber.{ts,js}')],
          synchronize: config.synchronize,
          logging: config.logging,
          charset: config.charset,
          timezone: config.timezone,
        };
      },
    }),
    TypeOrmModule.forFeature([Execution, Job, Transaction]),
  ],
  providers: [CoreService, ExecuteService, JobSubscriber],
  exports: [TypeOrmModule, CoreService, ExecuteService],
})
export class CoreModule {
}
