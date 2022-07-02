import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isTruthy } from './helper';

@Injectable()
export class CoreService {
  constructor(
    private readonly config: ConfigService,
  ) {
    console.log(`CoreService constructor`)
  }

  getQueueConfig () {
    return {
      host: this.config.get('RABBITMQ_QUEUE_HOST'),
      port: +this.config.get('RABBITMQ_QUEUE_PORT'),
      username: this.config.get('RABBITMQ_QUEUE_USERNAME'),
      password: this.config.get('RABBITMQ_QUEUE_PASSWORD'),
      consumer: {
        username: this.config.get('RABBITMQ_QUEUE_CONSUMER_USERNAME'),
        password: this.config.get('RABBITMQ_QUEUE_CONSUMER_PASSWORD'),
      }
    }
  }

  getDatabaseConfig() {
    return {
      host: this.config.get('DB_HOST'),
      port: +this.config.get('DB_PORT'),
      username: this.config.get('DB_USERNAME'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_DATABASE'),
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: isTruthy(this.config.get('DB_SYNC')),
      timezone: this.config.get('DB_TIMEZONE'),
      logging: isTruthy(this.config.get('DB_LOGGING')),
      charset: this.config.get('DB_CHARSET'),
    }
  }
}