import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from '../config/typeorm/typeorm.module';
import { DataBaseConstanciasRepository } from './repositories/constancias.repository';

@Module({
  imports: [TypeOrmModuleConfig, TypeOrmModule.forFeature([])],
  providers: [DataBaseConstanciasRepository],
  exports: [DataBaseConstanciasRepository],
})
export class RepositoriesModule {}
