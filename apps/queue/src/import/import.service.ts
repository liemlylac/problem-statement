import { ExecuteService } from '@app/core/services/execute.service';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from '@app/core/entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JobImportOptions } from './import.interface';

@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);
  constructor(
    private readonly executionService: ExecuteService,
    @InjectRepository(Transaction)
    private readonly transRepo: Repository<Transaction>
  ) {
  }

  async executeImport(data: JobImportOptions) {
    const queryRunner = this.transRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const jobStartedAt = new Date();
    try {
      this.logger.log(`Starting import ${data.executionId}.${data.jobId} (${data.items.length} items)`);
      await this.executionService.startJob(queryRunner.manager, data.executionId, data.jobId, jobStartedAt);
      await queryRunner.manager.insert(Transaction, data.items);
      await this.executionService.doneJob(queryRunner.manager, data.executionId, data.jobId);
      this.logger.log(`Imported ${data.executionId}.${data.jobId} (${data.items.length})`);
      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      await this.executionService.errorJob(data.executionId, data.jobId, error, { startedAt: jobStartedAt });
    } finally {
      await queryRunner.release();
    }
  }
}
