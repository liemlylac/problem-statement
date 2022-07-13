import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post, UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { Role } from '../auth/auth.options';
import { allowFileType } from './config';
import { FileService } from '../file/file.service';
import { TransactionImportFileDTO } from './dto/transaction-import.dto';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly fileService: FileService,
  ) {
  }

  @ApiOperation({ summary: 'Import transaction from file .csv, .xls or .xlsx'})
  @UseInterceptors(FileInterceptor('file', ))
  @Roles({ roles: [ Role.Admin, Role.User ]})
  @Post('import')
  async import(@UploadedFile(
    'file',
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 100 * 1024 } ),
        new FileTypeValidator({
          fileType: new RegExp(allowFileType.join('|'))
        }),
      ],
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  ) file: Express.Multer.File) {
    const data = this.fileService.flatDataFromAllSheet(this.fileService.readExcelFileFromBuffer(file.buffer));

    const validateResult = await this.transactionService.validateTransactionImportData(data, TransactionImportFileDTO);
    if (validateResult.errors.length > 0) {
      throw new UnprocessableEntityException({
        error: 'file_input_is_invalid',
        messages: validateResult.errors,
      })
    }
    return this.transactionService.import(validateResult.items, 300);
  }
}
