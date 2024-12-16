import { ApiProperty } from '@nestjs/swagger';

export class ResponsePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nombre: string;

  constructor(responseM: any) {
    this.id = responseM.id;
    this.nombre = responseM.nombre;
  }
}
