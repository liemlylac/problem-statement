import { IsUUID } from 'class-validator';

export class ExecutionDescribeResultDTO {
  id: string;
  metadata: any;
  startedAt: Date;
  endedAt: Date;
  jobs: {
    total: number;
    success: number;
    items: any[];
  };
}

export class ExecutionDescribeDTO {
  @IsUUID()
  executionId: string;
}