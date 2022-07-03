import { Execution } from '@app/core/entities/execution.entity';
import { Job } from '@app/core/entities/job.entity';
import { JobStatus } from '@app/core/job.enum';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Not, QueryFailedError, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

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

  getById(executionId, options: { loadJobs: boolean}) {
    const findOptions: FindOneOptions<Execution> = {
      where: {
        id: executionId,
      }
    };
    if (options.loadJobs) {
      findOptions.relations = ['jobs'];
      findOptions.order = {
        jobs: {
          createdAt: 'ASC',
        }
      }
    }
    return this.executeRepo.findOne(findOptions);
  }

  createJob(executionId: string, metadata) {
    const job = this.jobRepo.create({
      executionId: executionId,
      status: JobStatus.Pending,
      metadata: metadata,
    });
    return job.save({ reload: true });
  }

  async startJob(manager: EntityManager, executionId: string, jobId: string, startedAt: Date) {
    const execution: Execution = await manager.findOne(Execution, { where: { id: executionId } });
    if (!execution.startDate) {
      execution.startDate = startedAt;
      await manager.save(execution);
    }
    const job = await manager.findOne(Job, { where: { id: jobId } });
    const updatedJob = manager.merge(Job, job, {  status: JobStatus.Processing, startDate: startedAt });
    await manager.update(
      Job,
      jobId,
      updatedJob
    );
  }

  protected async countNoFinishedJob(manager: EntityManager, executionId: string): Promise<number> {
    return await manager.count(Job, {
      where: {
        executionId: executionId,
        status: Not(In([JobStatus.Pending, JobStatus.Processing])),
      },
    });
  }

  protected async foundLatestJobEndDate(manager: EntityManager, executionId: string) {
    const { endDate } = await manager.createQueryBuilder(Job, 'job')
      .select('job.endDate')
      .where('job.executionId = :executionId', { executionId })
      .orderBy('job.endDate', 'DESC')
      .getOne();
    return endDate;
  }

  async errorJob(executionId: string, jobId: string, error, options: any) {
    try {
      if (error instanceof QueryFailedError) {
        Logger.error(error);
        error.message = 'Internal Server Error, please check logger for more information';
      }
      const endDate = new Date();
      const job = await this.jobRepo.findOne({ where: { id: jobId } });
      const updatedJob = this.jobRepo.merge(job, {
        status: JobStatus.Error,
        startDate: options.startedAt,
        endDate: endDate,
        metadata: {...job.metadata, errorMessage: error.message},
      });
      await this.jobRepo.update(jobId, updatedJob);
      const execution: Execution = await this.jobRepo.manager.findOne(Execution, { where: { id: executionId } });
      if (!execution.startDate) {
        execution.startDate = options.startedAt;
      }
      if (!execution.endDate) {
        const countNoFinishedJobs = await this.countNoFinishedJob(this.jobRepo.manager, executionId);
        if (countNoFinishedJobs === 0) {
          execution.endDate = endDate;
        }
      }
      await this.jobRepo.save(execution);
    } catch (e) {
      Logger.error(e);
    }
  }

  async doneJob(manager: EntityManager, executionId: string, jobId: string) {
    const endDate = new Date();
    const job = await manager.findOne(Job, { where: { id: jobId } });
    const updatedJob = manager.merge(Job, job, { status: JobStatus.Success, endDate: endDate });
    await manager.update(Job, jobId, updatedJob);
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