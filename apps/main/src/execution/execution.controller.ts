import { Execution } from '@app/core/entities/execution.entity';
import { ExecuteService } from '@app/core/services/execute.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { Role } from '../auth/auth.options';
import {
  ExecutionDescribeDTO,
  ExecutionDescribeResultDTO,
} from './dto/execution-describe.dto';

@ApiTags('Execution')
@ApiBearerAuth()
@Controller('execution')
export class ExecutionController {
  constructor(
    protected readonly service: ExecuteService,
  ) {
  }

  protected mappingDescribeResponse(execution: Execution): ExecutionDescribeResultDTO {
    const dto = new ExecutionDescribeResultDTO();
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

  @ApiOperation({
    summary: 'Describe execution and job status',
    description: 'Show information about execution and job status'
  })
  @ApiOkResponse({ type: ExecutionDescribeResultDTO })
  @Get('describe/:executionId')
  @Roles({ roles: [Role.Admin, Role.User] })
  async describe(@Param() { executionId }: ExecutionDescribeDTO): Promise<ExecutionDescribeResultDTO>{
    const execution = await this.service.getById(executionId, { loadJobs: true });
    return this.mappingDescribeResponse(execution);
  }
}