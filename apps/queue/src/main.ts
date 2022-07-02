import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const host = config.get('RABBITMQ_QUEUE_HOST');
  const port = +config.get<number>('RABBITMQ_QUEUE_PORT');
  const username = config.get('RABBITMQ_QUEUE_USERNAME');
  const password = config.get('RABBITMQ_QUEUE_PASSWORD');
  const connectionStr = `amqp://${username}:${password}@${host}:${port}`;
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [connectionStr],
      queue: config.get('TRANSACTION_QUEUE_NAME'),
      noAck: false,
      prefetchCount: 1,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
