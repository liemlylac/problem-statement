import { commonConfig } from '@app/core/config';
import { Controller, Logger } from '@nestjs/common';
import { JobImportTransaction } from './transaction.interface';
import { TransactionService } from './transaction.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);
  constructor(
    private readonly service: TransactionService,
  ) {
  }

  @MessagePattern(commonConfig.MessagePattern.Transaction.Import)
  async import(@Payload() data: JobImportTransaction, @Ctx() context: RmqContext) {
    this.logger.log(`Received message: ${JSON.stringify(commonConfig.MessagePattern.Transaction.Import)}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.service.import(data);
      return {};
    } catch (e) {
      this.logger.error(e);
    } finally {
      channel.ack(originalMsg);
    }
  }
}