import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor, HttpExceptionFilter } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'QUEUE_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const host = config.get('RABBITMQ_QUEUE_HOST');
          const port = +config.get<number>('RABBITMQ_QUEUE_PORT');
          const username = config.get('RABBITMQ_QUEUE_USERNAME');
          const password = config.get('RABBITMQ_QUEUE_PASSWORD');
          const connectionStr = `amqp://${username}:${password}@${host}:${port}`;
          return {
            transport: Transport.RMQ,
            options: {
              urls: [connectionStr],
              queue: config.get('TRANSACTION_QUEUE_NAME'),
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const options: TypeOrmModuleOptions = {
          type: 'mysql',
          host: config.get('DB_HOST'),
          port: +config.get<number>('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          entities: ['dist/**/*.entity.{ts,js}'],
          synchronize: false,
          logging: !!config.get('DB_LOGGING'),
          charset: config.get('DB_CHARSET') || 'utf8mb4',
          timezone: config.get('DB_TIMEZONE') || 'Z',
        };
        return options;
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule {}
