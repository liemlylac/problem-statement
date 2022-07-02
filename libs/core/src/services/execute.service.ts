import { Execution } from '@app/core/entities/execution.entity';
import { Job } from '@app/core/entities/job.entity';
import { JobStatus } from '@app/core/job.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Not, Repository } from 'typeorm';

@Injectable()
export class ExecuteService {
  constructor(
    @InjectRepository(Execution)
    private readonly executeRepo: Repository<Execution>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
  ) {
  }

  async createExecution(metadata): Promise<Execution> {
    const execution = this.executeRepo.create({
      metadata: metadata,
    });
    return await execution.save({ reload: true });
  }

  createJob(executionId: string, metadata) {
    const job = this.jobRepo.create({
      executionId: executionId,
      status: JobStatus.Pending,
      metadata: metadata,
    });
    return job.save({ reload: true });
  }

  async startJob(manager: EntityManager, executionId: string, jobId: string) {
    const execution: Execution = await manager.findOne(Execution, { where: { id: executionId } });
    const startDate = new Date();
    if (!execution.startDate) {
      execution.startDate = startDate;
      await manager.save(execution);
    }
    const job = await manager.preload(Job, { id: jobId, status: JobStatus.Processing, startDate: startDate });
    await manager.update(Job, jobId, job);
  }

  protected async countNoFinishedJob(manager: EntityManager, executionId: string): Promise<number> {
    return await manager.count(Job, {
      where: {
        executionId: executionId,
        status: Not(In([JobStatus.Pending, JobStatus.Processing])),
      },
    });
  }

  async errorJob(manager: EntityManager, executionId: string, jobId: string) {
    const endDate = new Date();
    const job = await manager.preload(Job, { id: jobId, status: JobStatus.Error, endDate: endDate });
    await manager.update(Job, jobId, job);
    const execution: Execution = await manager.findOne(Execution, { where: { id: executionId } });
    if (!execution.endDate) {
      const countNoFinishedJobs = await this.countNoFinishedJob(manager, executionId);
      if (countNoFinishedJobs === 0) {
        execution.endDate = endDate;
        await manager.save(execution);
      }
    }
  }

  async doneJob(manager: EntityManager, executionId: string, jobId: string) {
    const endDate = new Date();
    const job = await manager.preload(Job, { id: jobId, status: JobStatus.Success, endDate: endDate });
    await manager.update(Job, jobId, job);
    const execution: Execution = await manager.findOne(Execution, { where: { id: executionId } });
    if (!execution.endDate) {
      const countNoFinishedJobs = await this.countNoFinishedJob(manager, executionId);
      if (countNoFinishedJobs === 0) {
        execution.endDate = endDate;
        await manager.save(execution);
      }
    }
  }
}