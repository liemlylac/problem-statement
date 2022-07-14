import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'datetime', type: 'datetime', nullable: false })
  datetime: Date;

  @Column({ name: 'content', type: 'varchar', nullable: true })
  content: string;

  @Column({ name: 'amount', type: 'bigint', nullable: false })
  amount: number;

  @Column({ name: 'type', type: 'tinyint', width: 1, comment: '0. Withdraw, 1. Deposit' })
  type: number;
}
