export class ExecutionDescribeDto {
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
