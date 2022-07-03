import { Module } from '@nestjs/common';
import { CoreModule } from '@app/core';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';

@Module({
  imports: [CoreModule],
  controllers: [ImportController],
  providers: [ImportService],
  exports: [ImportService]
})
export class ImportModule {}
