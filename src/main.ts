import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './infrastructure/config/logger/logger.service';
import { envs } from './infrastructure/config/environments/envs';
import { LogginInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseIterceptor,
} from './infrastructure/common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Constancias-ms');

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LogginInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseIterceptor());

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

  const port = envs.port;
  await app.listen(port);

  logger.log(`Constancias-ms is running on http://localhost:${port}`);
}
bootstrap();
