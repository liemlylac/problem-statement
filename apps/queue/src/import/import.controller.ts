import { commonConfig } from '@app/core/config';
import { Controller, Logger } from '@nestjs/common';
import { JobImportOptions } from './import.interface';
import { ImportService } from './import.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class ImportController {
  private readonly logger = new Logger(ImportController.name);
  constructor(
    private readonly service: ImportService,
  ) {
  }

  @MessagePattern(commonConfig.MessagePattern.Transaction.Import)
  async executeImport(@Payload() data: JobImportOptions, @Ctx() context: RmqContext) {
    this.logger.log(`Received message: ${JSON.stringify(commonConfig.MessagePattern.Transaction.Import)}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.service.executeImport(data);
      return;
    } catch (e) {
      this.logger.error(e);
    } finally {
      channel.ack(originalMsg);
    }
  }
}
