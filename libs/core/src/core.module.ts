import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { coreConfigSchema } from './core-config.schema';
import { CoreService } from './core.service';
import { Execution } from './entities/execution.entity';
import { Job } from './entities/job.entity';
import { Transaction } from './entities/transaction.entity';

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
          entities: ['dist/**/*.entity.{ts,js}'],
          synchronize: true,
          logging: config.logging,
          charset: config.charset,
          timezone: config.timezone,
        };
      },
    }),
    TypeOrmModule.forFeature([Execution, Job, Transaction]),
  ],
  providers: [CoreService],
  exports: [TypeOrmModule, CoreService],
})
export class CoreModule {
}
