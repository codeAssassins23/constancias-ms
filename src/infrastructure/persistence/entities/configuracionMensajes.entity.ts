import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("CONFIGURACIONMENSAJES")
export class ConfiguracionMensajes {
  @PrimaryGeneratedColumn({ name: "idMensaje" })
  idMensaje: number;

  @Column({ type: "int" })
  idTramite: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  nombreParametroRestriccion: string;

  @Column({ type: "text", nullable: true })
  mensajeEspecifico: string;

  @Column({ type: "text", nullable: true })
  mensajeGeneral: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  tipoMensaje: string;
}
