import { Module } from '@nestjs/common';
import { FileModule } from '../file/file.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [FileModule],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
