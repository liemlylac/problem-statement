import { ExecuteService } from '@app/core/services/execute.service';
import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from '../queue/queue.service';
import { TransactionService } from './transaction.service';

jest.mock('@app/core/services/execute.service');
jest.mock('../queue/queue.service');

describe('TransactionService', () => {
  let service: TransactionService;
  let executeService: ExecuteService;
  let queueService: QueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService, ExecuteService, QueueService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    executeService = module.get<ExecuteService>(ExecuteService);
    queueService = module.get<QueueService>(QueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(executeService).toBeDefined();
    expect(queueService).toBeDefined();
  });
});
