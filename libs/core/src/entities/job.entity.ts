import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Execution } from './execution.entity';

@Entity('job')
export class Job {
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
  metadata: string;

  @ManyToOne(() => Execution, (execution) => execution.jobs)
  @JoinColumn({ name: 'execution_id' })
  execution: Execution;
}