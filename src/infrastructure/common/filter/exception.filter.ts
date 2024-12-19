import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from 'src/infrastructure/config/logger/logger.service';

interface IError {
  message: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Construir el mensaje de error
    const errorMessage: IError = {
      message: exception.message || 'Internal Server Error',
    };

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      if (typeof errorResponse === 'string') {
        errorMessage.message = errorResponse;
      } else if (
        typeof errorResponse === 'object' &&
        'message' in errorResponse
      ) {
        errorMessage.message =
          (errorResponse as any).message || errorMessage.message;
      }
    }

    const errorData = {
      code: 'ERROR',
      message: errorMessage.message,
    };

    this.logger.Error(request, { statusCode: status }, errorData);

    const responseData = {
      status: status,
      datetime: new Date().toISOString(),
      path: request.url,
      ...errorMessage,
    };

    response.status(status).json(responseData);
  }
}
