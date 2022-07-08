import { commonConfig } from '@app/core/config';
import { ExecuteService } from '@app/core/services/execute.service';
import { Injectable, Logger } from '@nestjs/common';
import { ImportInterface } from '../interfaces/import.interface';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class TransactionService implements ImportInterface {
  private readonly logger = new Logger(TransactionService.name);
  constructor(
    private readonly executionService: ExecuteService,
    private readonly queueService: QueueService,
  ) {
  }

  /**
   * Import transaction, split input into small pieces and send to queue
   *
   * @param input
   * @param maxItemPerQueue
   */
  async import(input: any[], maxItemPerQueue: number) {
    const listItem = input.slice(0); // deep clone to new array
    try {
      const execution = await this.executionService.createExecution({
        totalItems: listItem.length,
      });
      while(listItem.length > 0) {
        const queueItems = listItem.splice(0, maxItemPerQueue);
        const job = await this.executionService.createJob(execution.id, { totalItems: queueItems.length });
        this.logger.log(`Send to queue: ${JSON.stringify({
          executionId: execution.id,
          jobId: job.id,
          items: queueItems.length,
        })}`)
        this.queueService.send(
          commonConfig.MessagePattern.Transaction.Import,
          {
            executionId: execution.id,
            jobId: job.id,
            items: queueItems,
          }
        );
      }
      return {
        executionId: execution.id,
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
