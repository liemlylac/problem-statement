import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { QUEUE_SERVICE } from './queue.config';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);
  constructor(
    @Inject(QUEUE_SERVICE)
    private readonly client: ClientProxy,
  ) {
  }

  send<TResult, TInput>(pattern, data: TInput): Promise<TResult> {
    this.logger.log(`Send message pattern "${JSON.stringify(pattern)}"`);
    return firstValueFrom(this.client.send(pattern, data));
  }
}