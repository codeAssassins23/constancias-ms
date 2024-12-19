import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../config/logger/logger.module';
import { RepositoriesModule } from '../persistence/repository.module';
import { DataBaseConstanciasRepository } from '../persistence/repositories/constancias.repository';
import { LoggerService } from '../config/logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';
import { FindStudentInformationUseCases } from 'src/application/use-cases/informationCC/findStudentInformation.use-cases';

@Module({
  imports: [
    LoggerModule,
    RepositoriesModule,
    //ExceptionModule,
  ],
})
export class UseCasesProxyModule {
  //usecases
  static FIND_STUDENT_INFORMATION = 'findStudentInformation';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [DataBaseConstanciasRepository, LoggerService],
          provide: UseCasesProxyModule.FIND_STUDENT_INFORMATION,
          useFactory: (
            constanciasRepository: DataBaseConstanciasRepository,
            logger: LoggerService
          ) => new UseCaseProxy(new FindStudentInformationUseCases(constanciasRepository))
        }
      ],
      exports: [
        UseCasesProxyModule.FIND_STUDENT_INFORMATION
      ],
    };
  }
}
