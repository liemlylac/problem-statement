import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

jest.mock('./transaction.service');
jest.mock('../file/file.service');

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService, FileService]
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
    fileService = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(fileService).toBeDefined();
  });
});
