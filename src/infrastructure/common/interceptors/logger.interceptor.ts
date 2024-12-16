import {
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
    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData();

    const ip = this.getIP(data);

    this.logger.log(
      `Incoming Request`,
      `data=${JSON.stringify(data)} ip=${ip}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `End Request`,
          `duration=${Date.now() - now}ms data=${JSON.stringify(data)} ip=${ip}`,
        );
      }),
    );
  }

  private getIP(data: any): string {
    // Extraer la IP del payload del mensaje TCP (deberías asegurarte de incluirla desde el client-gateway)
    return data.ip || 'IP not found'; // Si no existe, poner un valor por defecto
  }
}
