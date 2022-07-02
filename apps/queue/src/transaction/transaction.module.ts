import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CoreModule } from '@app/core';

@Module({
  imports: [CoreModule],
  providers: [TransactionService]
})
export class TransactionModule {}
