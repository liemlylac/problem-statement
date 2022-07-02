import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {
  }

  @Post('import')
  import(@Body() data: any) {
    const input = [];
    for (let i = 0; i < data.size; i++) {
      const record: any = { content: data.content, datetime: new Date() };
      record.amount = (Math.random() * 2 - 1) * (Math.random() * 1000) * 1500;
      record.type = record.amount > 0 ? 'Deposit'  : 'Withdraw' ;
      input.push(record);
    }
    console.log(`Input ${input.length} items`);
    return this.transactionService.import(input);
  }
}
