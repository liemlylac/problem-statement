import { Global, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEUE_SERVICE } from './queue.config';
import { CoreModule, CoreService } from '@app/core';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QUEUE_SERVICE,
        imports: [CoreModule, ConfigModule],
        inject: [CoreService, ConfigService],
        useFactory: (core: CoreService, config: ConfigService) => {
          const queueConfig = core.getQueueConfig();
          return {
            transport: Transport.RMQ,
            options: {
              urls: [
                `amqp://${queueConfig.username}:${queueConfig.password}@${queueConfig.host}:${queueConfig.port}`,
              ],
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
  providers: [QueueService],
  exports: [ClientsModule, QueueService],
})
export class QueueModule {
}