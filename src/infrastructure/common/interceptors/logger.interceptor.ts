/* import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from 'src/infrastructure/config/logger/logger.service';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    // Acceder al contexto HTTP
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    const { method, url } = request;
    const ip = request.ip || 'IP not found';

    // Log de inicio de solicitud
    this.logger.log('Incoming Request', {
      action: 'incoming-request',
      event: 'handle-request',
      urlService: url,
      message: `Method=${method} IP=${ip}`,
    });

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;

        // Log de finalización de solicitud
        this.logger.log('End Request', {
          action: 'end-request',
          event: 'request-completed',
          urlService: url,
          responseTime: responseTime,
          status: response.statusCode || 200,
          message: `Processed request in ${responseTime}ms`,
        });
      }),
    );
  }
}
 */
