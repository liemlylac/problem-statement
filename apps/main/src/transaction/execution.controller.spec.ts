import { ExecuteService } from '@app/core/services/execute.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionController } from '../execution/execution.controller';

jest.mock('@app/core/services/execute.service');

describe('ExecutionController', () => {
  let controller: ExecutionController;
  let service: ExecuteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecutionController],
      providers: [ExecuteService]
    }).compile();

    controller = module.get<ExecutionController>(ExecutionController);
    service = module.get<ExecuteService>(ExecuteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
