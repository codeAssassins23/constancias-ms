import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsInt, MinLength } from 'class-validator';

// TODO: Cambiar los ejemplos y descripciones
export class InformationCCDto {
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ example: 'John', description: 'Valor de busqueda' })
  codigoTramite: number;

  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'John', description: 'Valor de busqueda' })
  emplId: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'John', description: 'Valor de busqueda' })
  campusPS: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'John', description: 'Valor de busqueda' })
  esEgresado: string;
}
