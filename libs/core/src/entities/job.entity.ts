import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Execution } from './execution.entity';

@Entity('job')
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'execution_id', type: 'varchar', length: 36, nullable: false })
  executionId: string;

  @Column({ name: 'status', type: 'varchar', nullable: false })
  status: string;

  @Column({ name: 'start_date', type: 'datetime', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'datetime', nullable: true })
  endDate: Date;

  @Column({ name: 'metadata', type: 'json', nullable: true })
  metadata: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Execution, (execution) => execution.jobs)
  @JoinColumn({ name: 'execution_id', referencedColumnName: 'id' })
  execution: Execution;
}
