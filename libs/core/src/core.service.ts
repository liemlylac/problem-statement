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
      synchronize: true,
      timezone: this.config.get('DB_TIMEZONE') || 'Z',
      logging: isTruthy(this.config.get('DB_LOGGING')) || false,
      charset: this.config.get('DB_CHARSET') || 'utf8',
    }
  }
}