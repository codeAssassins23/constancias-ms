import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/infrastructure/config/logger/logger.service';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const transactionId = randomUUID();
    req['idTransaction'] = transactionId;
    req['startTime'] = Date.now();

    this.logger.logRequest({
      ...req,
      url: req.originalUrl,
    });
    next();
  }
}
