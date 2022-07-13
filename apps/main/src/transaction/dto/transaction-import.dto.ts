import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDateString, IsDefined, IsEnum, IsNumber, IsString } from 'class-validator';

export enum TransactionTypeEnum {
  deposit = 1,
  withdraw = 0,
}

function transformDate({ value }) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  try {
    return new Date(value).toISOString();
  } catch (e) { // Maybe cause error if value is not Date string
    return value; // just return value and throw error by class-validator: @IsDateString()
  }
}

function transformTransactionType({ value }) {
  value = value.toLowerCase();
  if (typeof value !== 'string') {
    throw new BadRequestException('type must be string')
  }
  if (!(value in TransactionTypeEnum)) {
    throw new BadRequestException('Value of type is not valid, allow "Deposit" and "Withdraw"')
  }
  return TransactionTypeEnum[value];
}

export class TransactionImportFormDTO {
  @ApiProperty()
  @IsDefined()
  file: any;
}

export class TransactionImportFileDTO {
  @ApiProperty()
  @IsDateString()
  @Transform(transformDate, { toClassOnly: true })
  datetime: Date;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @ApiProperty()
  @Transform(transformTransactionType, { toClassOnly: true })
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;
}