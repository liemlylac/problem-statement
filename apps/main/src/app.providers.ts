import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthGuard, RoleGuard } from 'nest-keycloak-connect';
import { HttpExceptionFilter, LoggingInterceptor } from './common';
import { ValidationPipe } from './common/validation.pipe';

export const appProviders = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RoleGuard,
  },
];
