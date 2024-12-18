import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModuleConfig } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from './infrastructure/config/logger/logger.module';
import { RepositoriesModule } from './infrastructure/persistence/repository.module';
import { UseCasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllerModule } from './interfaces/rest/controllers.module';
import { LoggerMiddleware } from './infrastructure/common/middleware/loggerMiddleware';
import { LoggerService } from './infrastructure/config/logger/logger.service';

@Module({
  imports: [
    TypeOrmModuleConfig,
    LoggerModule,
    RepositoriesModule,
    UseCasesProxyModule.register(),
    ControllerModule,
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
