import { Execution } from '@app/core/entities/execution.entity';
import { Logger } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Job } from '../entities/job.entity';

@EventSubscriber()
export class JobSubscriber implements EntitySubscriberInterface<Job> {

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Job;
  }

  protected async countTotalJob(manager: EntityManager, executionId: string) {
    const { count } = await manager.createQueryBuilder(Job, 'job')
      .select('COUNT(job.id)', 'count')
      .where({ executionId: executionId})
      .getRawOne();
    return count;
  }

  protected async countSuccessJob(manager: EntityManager, executionId: string) {
    const { count } = await manager.createQueryBuilder(Job, 'job')
      .select('COUNT(job.id)', 'count')
      .where({ executionId: executionId, status: 'done' })
      .getRawOne();
    return count;
  }

  async afterInsert(event: InsertEvent<Job>) {
    try {
      const manager = event.queryRunner.manager;
      const job = event.entity;
      await manager.update(Execution, job.executionId, {
        jobTotal: await this.countTotalJob(manager, job.executionId)
      });
    } catch (e) {
      Logger.error(e);
    }
  }

  async afterUpdate(event: UpdateEvent<Job>) {
    try {
      const manager = event.queryRunner.manager;
      const job = event.entity;
      await manager.update(Execution, job.executionId, {
        jobSuccess: await this.countSuccessJob(manager, job.executionId),
      });
    } catch (e) {
      Logger.error(e);
    }
  }
}