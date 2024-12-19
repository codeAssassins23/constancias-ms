import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { envs } from '../environments/envs';
import { ILooger } from 'src/domain/logger/logger.interface';

@Injectable()
export class LoggerService implements ILooger {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: envs.opensearch.logLevel || 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ssZ' }),
        winston.format.json(),
      ),
      defaultMeta: {
        serviceName: '(NRO)-ms-constancias',
        version: '1.0.0',
      },
      transports: [new winston.transports.Console()],
    });
  }

  private formatMessage(req: any): string {
    const query =
      req.query && Object.keys(req.query).length
        ? `Query: ${JSON.stringify(req.query)}`
        : '';
    const params =
      req.params && Object.keys(req.params).length
        ? `Params: ${JSON.stringify(req.params)}`
        : '';
    const body =
      req.body && Object.keys(req.body).length
        ? `Body: ${JSON.stringify(req.body)}`
        : '';
    return [query, params, body].filter(Boolean).join(' | ');
  }

  logRequest(req: any) {
    this.logger.info({
      IdTransaction: req.idTransaction,
      datetime: new Date().toISOString(),
      urlService: req.url,
      action: 'start-request',
      event: `${req.method} ${req.url}`,
      responseTime: 0,
      method: req.method,
      status: 'ok',
      code: '0',
      message: this.formatMessage(req) || 'No request data',
    });
  }

  Response(req: any, res: any, body: any) {
    const responseTime = Date.now() - req.startTime;
    this.logger.info({
      IdTransaction: req.idTransaction,
      datetime: new Date().toISOString(),
      urlService: req.url,
      action: 'end-request',
      event: `${req.method} ${req.url}`,
      method: req.method,
      responseTime,
      status: res.statusCode,
      code: '0',
      message: `Response: ${JSON.stringify(body)}`,
    });
  }

  Error(req: any, res: any, error: any) {
    const responseTime = Date.now() - req.startTime;
    this.logger.error({
      IdTransaction: req.idTransaction,
      datetime: new Date().toISOString(),
      urlService: req.url,
      action: 'error',
      event: `${req.method} ${req.url}`,
      method: req.method,
      responseTime,
      status: res.statusCode || 500,
      code: error.code || 'ERROR',
      message: error.message || 'Internal Server Error',
    });
  }
}
