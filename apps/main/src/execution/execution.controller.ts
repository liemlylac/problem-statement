import { Execution } from '@app/core/entities/execution.entity';
import { ExecuteService } from '@app/core/services/execute.service';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { ExecutionDescribeDto } from './dto/execution-describe.dto';


@Controller('execution')
export class ExecutionController {
  constructor(
    protected readonly service: ExecuteService,
  ) {
  }

  protected mappingDescribeResponse(execution: Execution): ExecutionDescribeDto {
    const dto = new ExecutionDescribeDto();
    dto.id = execution.id;
    dto.startedAt = execution.startDate;
    dto.endedAt = execution.endDate;
    dto.metadata = execution.metadata;
    dto.jobs = {
      total: execution.jobTotal,
      success: execution.jobSuccess,
      items: execution.jobs,
    };
    return dto;
  }

  @Get('describe/:executionId')
  async describe(@Param('executionId') executionId: string) {
    if (!isUUID(executionId)) {
      throw new BadRequestException('Invalid id (UUID) format');
    }
    const execution = await this.service.getById(executionId, { loadJobs: true });
    return this.mappingDescribeResponse(execution);
  }
}