import { Transaction } from '@app/core/entities/transaction.entity';
import { ExecuteService } from '@app/core/services/execute.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImportService } from './import.service';

jest.mock('@app/core/services/execute.service');

describe('ImportService', () => {
  let service: ImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportService,
        ExecuteService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: {}
        }],
    }).compile();

    service = module.get<ImportService>(ImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
