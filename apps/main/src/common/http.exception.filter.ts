import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

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

    if (400 <= status && status < 500) { // * HttpStatus 4xx
      const responseInside: any = exception.getResponse();
      const errorMessages = responseInside.messages ?? responseInside.message
      if (errorMessages) {
        exception.message = errorMessages;
      }
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
