import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './infrastructure/config/logger/logger.service';
import { envs } from './infrastructure/config/environments/envs';
import {
  ResponseFormat,
  ResponseIterceptor,
} from './infrastructure/common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configureXRay } from './infrastructure/config/environments/xray';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';

async function bootstrap() {
  const logger = new Logger('Constancias-ms');

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseIterceptor());
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  const config = new DocumentBuilder()
    .setTitle('Constancias-ms')
    .setDescription('Microservicio de constancias')
    .setVersion('1.0')
    .addTag('Constancias')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ResponseFormat],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  configureXRay();

  const port = envs.port;
  await app.listen(port);

  logger.log(`Constancias-ms is running on http://localhost:${port}`);
}
bootstrap();
