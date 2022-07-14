import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptor Ws');
    const requestTime = Date.now();
    const client = context.switchToWs().getClient();

    return next
      .handle()
      .pipe(
        tap(() => {
          const duration = Date.now() - requestTime;
          Logger.log(
            `${duration.toLocaleString('en-US')}ms`,
            client.name,
          );
        }),
      );
  }
}
