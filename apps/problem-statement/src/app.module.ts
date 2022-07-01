import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  providers: [],
})
export class AppModule {}
