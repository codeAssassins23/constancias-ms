import { Type } from 'class-transformer';
import { IsString, IsInt, MinLength } from 'class-validator';

export class InformationCCDto {
  @IsInt()
  @Type(() => Number)
  codigoTramite: number;

  @IsString()
  @MinLength(1)
  emplId: string;

  @IsString()
  @MinLength(1)
  campusPS: string;

  @IsString()
  @MinLength(1)
  esEgresado: string;
}
