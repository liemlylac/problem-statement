import { CoreService } from '@app/core/core.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { resolve } from 'path';

describe('CoreService', () => {
  let coreService: CoreService;
  beforeEach(async () => {
    const path = resolve('.env.test');
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: path})],
      providers: [CoreService],
    }).compile();
    coreService = module.get(CoreService);
  });

  it('should be defined', () => {
    expect(coreService).toBeDefined();
  });

  describe('getQueueConfig', () => {
    it('should return queue config', () => {
      expect(coreService.getQueueConfig()).toEqual({
        host: 'localhost',
        port: 5672,
        username: 'admin',
        password: 'secret',
        consumer: {
          username: 'admin',
          password: 'secret',
        }
      })
    })
  });

  describe('getDatabaseConfig', () => {
    it('should return database config', () => {
      expect(coreService.getDatabaseConfig()).toEqual({
        host: 'localhost',
        port: 33061,
        username: 'root',
        password: 'secret',
        database: 'problem_statement',
        entities: ['dist/**/*.entity.{ts,js}'],
        synchronize: true,
        timezone: 'Z',
        logging: true,
        charset: 'utf8mb4'
      });
    })
  });
});
