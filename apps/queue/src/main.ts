import { CoreService } from '@app/core';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const core = app.get(CoreService);
  const queueConfig = core.getQueueConfig();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${queueConfig.consumer.username}:${queueConfig.consumer.password}@${queueConfig.host}:${queueConfig.port}`,
      ],
      queue: config.get('TRANSACTION_QUEUE_NAME'),
      noAck: false,
      // prefetchCount: 1,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
