import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../config/logger/logger.module';
import { RepositoriesModule } from '../persistence/repository.module';
@Module({
  imports: [
    LoggerModule,
    RepositoriesModule,
    //ExceptionModule,
  ],
})
export class UseCasesProxyModule {
  //usecases

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [],
      exports: [],
    };
  }
}
