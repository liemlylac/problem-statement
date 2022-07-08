import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /**
   * Interceptor for logging request and response. For Http only
   *
   * @param context
   * @param next
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const endpoint = request.url;

    return next
      .handle()
      .pipe(
        tap(() => {
          const duration = Date.now() - requestTime;
          Logger.log(
            `${method} ${endpoint} ${duration.toLocaleString('en-US')}ms`,
            context.getClass().name,
          );
        }),
      );
  }
}