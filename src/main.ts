import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './infrastructure/config/logger/logger.service';
import { envs } from './infrastructure/config/environments/envs';
import { LogginInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { ResponseIterceptor } from './infrastructure/common/interceptors/response.interceptor';

async function bootstrap() {
  const logger = new Logger('Basic-ms');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port,
      },
    },
  );
  app.useGlobalInterceptors(new LogginInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseIterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen();

  logger.log(`Basic-MS is running on ${envs.port}`);
}
bootstrap();
