import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from '../environments/envs';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: envs.database.host,
  port: envs.database.port,
  username: envs.database.user,
  password: envs.database.password,
  database: envs.database.name,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: envs.database.synchronize,
  ssl: envs.database.ssl || false,
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmModuleConfig {}
