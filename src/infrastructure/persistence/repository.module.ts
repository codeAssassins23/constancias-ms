import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from '../config/typeorm/typeorm.module';
import { DataBaseConstanciasRepository } from './repositories/constancias.repository';
import { Tramite } from './entities/tramite.entity';
import { Cuentatramite } from './entities/cuentaTramite.entity';
import { SolicitudActualizacion } from './entities/solicituActualización.entity';

@Module({
  imports: [TypeOrmModuleConfig, TypeOrmModule.forFeature([Tramite, Cuentatramite, SolicitudActualizacion])],
  providers: [DataBaseConstanciasRepository],
  exports: [DataBaseConstanciasRepository],
})
export class RepositoriesModule {}
