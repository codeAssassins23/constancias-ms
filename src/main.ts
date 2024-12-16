import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './infrastructure/config/logger/logger.service';
import { envs } from './infrastructure/config/environments/envs';
import { LogginInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { ResponseIterceptor } from './infrastructure/common/interceptors/response.interceptor';

async function bootstrap() {
  const logger = new Logger('Constancias-ms');

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LogginInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseIterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = envs.port;
  await app.listen(port);

  logger.log(`Constancias-ms is running on http://localhost:${port}`);
}
bootstrap();
