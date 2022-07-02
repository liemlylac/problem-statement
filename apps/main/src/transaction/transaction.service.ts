import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly queueService: QueueService,
  ) {
  }

  async import(input: any[]) {
    const maxItemPerQueue = 100;
    const listItem = input.slice(0); // deep clone to new array
    try {
      while(listItem.length > 0) {
        const queueItems = listItem.splice(0, maxItemPerQueue);
        console.log(`Queue ${queueItems.length} items`);
        this.queueService.send('transaction_import', queueItems);
      }
      return 'Ok';
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
