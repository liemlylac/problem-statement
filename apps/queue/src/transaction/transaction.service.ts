import { ExecuteService } from '@app/core/services/execute.service';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from '@app/core/entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JobImportTransaction } from './transaction.interface';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);
  constructor(
    private readonly executionService: ExecuteService,
    @InjectRepository(Transaction)
    private readonly transRepo: Repository<Transaction>
  ) {
  }

  async import(data: JobImportTransaction) {
    const queryRunner = this.transRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.log(`Starting import ${data.executionId}.${data.jobId} (${data.items.length} items)`);
      await this.executionService.startJob(queryRunner.manager, data.executionId, data.jobId);
      await queryRunner.manager.insert(Transaction, data.items);
      await this.executionService.doneJob(queryRunner.manager, data.executionId, data.jobId);
      this.logger.log(`Imported ${data.executionId}.${data.jobId} (${data.items.length})`);
      await queryRunner.commitTransaction();
      return 'Ok';
    } catch (e) {
      this.logger.error(e);
      await this.executionService.errorJob(queryRunner.manager, data.executionId, data.jobId);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
