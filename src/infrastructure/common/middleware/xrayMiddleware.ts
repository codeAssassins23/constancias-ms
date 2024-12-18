import { Injectable, NestMiddleware } from '@nestjs/common';
import * as AWSXRay from 'aws-xray-sdk';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XRayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const segmentName = 'ms-constancias';

    const xRayMiddleware = AWSXRay.express.openSegment(segmentName);

    xRayMiddleware(req, res, () => {
      res.on('finish', () => {
        console.log('X-Ray segment cerrado.');
      });
      next();
    });
  }
}
