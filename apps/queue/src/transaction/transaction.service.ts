import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from '@app/core/entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transRepo: Repository<Transaction>
  ) {
  }
  import(data: any) {
    // TODO implement import process
  }
}
