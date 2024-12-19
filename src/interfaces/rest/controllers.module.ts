import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { ConstanciasController } from './constancias.controller';
import { LoggerService } from 'src/infrastructure/config/logger/logger.service';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [ConstanciasController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class ControllerModule {}
