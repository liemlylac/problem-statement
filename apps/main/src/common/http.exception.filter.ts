import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Catching all http exceptions
   *
   * @param exception
   * @param host
   */
  catch(exception: HttpException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof BadRequestException) {
      const responseInside: any = exception.getResponse();
      exception.message = responseInside.message.join(', ');
    }

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
      message: exception.message,
    }
    Logger.log(responseBody, HttpExceptionFilter.name);
    response.status(status).json(responseBody);
  }
}
