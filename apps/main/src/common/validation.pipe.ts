import { Injectable, ValidationPipe as NestValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor(
    private readonly config: ConfigService,
  ) {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
      transform: true,
      disableErrorMessages: false,
      enableDebugMessages: config.get('NODE_ENV') !== 'production',
    });
  }
}
