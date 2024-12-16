import { Module } from '@nestjs/common';
import { TypeOrmModuleConfig } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from './infrastructure/config/logger/logger.module';
import { RepositoriesModule } from './infrastructure/persistence/repository.module';
import { UseCasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllerModule } from './interfaces/rest/controllers.module';

@Module({
  imports: [
    TypeOrmModuleConfig,
    LoggerModule,
    /* ExceptionModule, */
    RepositoriesModule,
    UseCasesProxyModule.register(),
    ControllerModule,
  ],
  providers: [],
})
export class AppModule {}
