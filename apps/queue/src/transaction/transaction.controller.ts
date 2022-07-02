import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class TransactionController {
  constructor(
    private readonly service: TransactionService,
  ) {
  }

  @MessagePattern('transaction_import')
  async import(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log(`Received ${data.length} items`);
    await this.service.import(data);
    channel.ack(originalMsg);
  }
}