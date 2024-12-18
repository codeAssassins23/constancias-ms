import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from '../config/typeorm/typeorm.module';
import { DataBaseConstanciasRepository } from './repositories/constancias.repository';
import { Tramite } from './entities/tramite.entity';
import { Cuentatramite } from './entities/cuentaTramite.entity';
import { SolicitudActualizacion } from './entities/solicituActualización.entity';
import { Pagos } from './entities/pagos.entity';
import { StepsTipoTramite } from './entities/stepsTipoTramite.entity';

@Module({
  imports: [TypeOrmModuleConfig, TypeOrmModule.forFeature([Tramite, Cuentatramite, SolicitudActualizacion, Pagos, StepsTipoTramite])],
  providers: [DataBaseConstanciasRepository],
  exports: [DataBaseConstanciasRepository],
})
export class RepositoriesModule {}
