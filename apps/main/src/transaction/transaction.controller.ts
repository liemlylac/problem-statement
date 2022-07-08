import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { Role } from '../auth/auth.options';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {
  }

  @Roles({ roles: [ Role.Admin, Role.User ]})
  @Post('import')
  import(@Body() data: any) {
    const input = [];
    for (let i = 0; i < data.total; i++) {
      const record: any = { content: data.content, datetime: new Date() };
      record.amount = (Math.random() * 2 - 1) * (Math.random() * 1000) * 1500;
      record.type = record.amount > 0 ? 1 : -1 ;
      input.push(record);
    }
    return this.transactionService.import(input, data.size);
  }
}
