import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { QUEUE_SERVICE } from './queue.config';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);
  constructor(
    @Inject(QUEUE_SERVICE)
    private readonly client: ClientProxy
  ) {
  }

  send(pattern, data) {
    console.log(`Send message pattern "${pattern}"`);
    return this.client.send(pattern, data).toPromise();
  }
}