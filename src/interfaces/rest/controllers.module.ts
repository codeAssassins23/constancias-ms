import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { ConstanciasController } from './constancias.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [ConstanciasController],
})
export class ControllerModule {}
