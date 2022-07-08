import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor,  } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { Role } from '../auth/auth.options';
import { allowFileType } from '../common/allow-file.type';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {
  }

  @UseInterceptors(FileInterceptor('file'))
  @Roles({ roles: [ Role.Admin, Role.User ]})
  @Post('import')
  import(@UploadedFile(
    'file',
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 100 * 1024 }),
        new FileTypeValidator({
          fileType: new RegExp(allowFileType.join('|'))
        })
      ]
    }),
  ) file: Express.Multer.File) {
    // TODO validate file content and process to import
    return file;
  }
}
