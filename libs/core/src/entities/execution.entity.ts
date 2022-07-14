import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Job } from './job.entity';

@Entity('execution')
export class Execution extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'start_date', type: 'datetime', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'datetime', nullable: true })
  endDate: Date;

  @Column({ name: 'metadata', type: 'json', nullable: true })
  metadata: string;

  @Column({ name: 'start_by', type: 'varchar', length: 36, nullable: true })
  startBy: string;

  @Column({ name: 'job_total', type: 'int', nullable: true })
  jobTotal: number;

  @Column({ name: 'job_success', type: 'int', nullable: true })
  jobSuccess: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Job, (job) => job.execution)
  jobs: Job[];
}
