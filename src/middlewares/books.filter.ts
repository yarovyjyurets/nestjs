import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('>>>>>HTTPEXCEPTION');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.dir(exception.getResponse(), { colors: true, depth: 10 });
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const json = exception.getResponse();

    response
      .status(status)
      .json({
        ...(json as object),
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    console.dir('GLOBAL ERROR', { colors: true, depth: 10 });
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.dir(exception.message, { colors: true, depth: 10 });
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;

    response.status(status).json({
      statusCode: `${status} asdasd`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
