import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Cuentatramite } from "./cuentaTramite.entity";
import { ConfiguracionTramite } from "./configuracionTramite.entity";
import { SolicitudActualizacion } from "./solicituActualización.entity";

@Entity("TRAMITE")
export class Tramite {
  @PrimaryGeneratedColumn()
  Codigo: number;

  @Column({ type: "varchar", length: 255 })
  Nombre: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  DescripcionCorta: string;

  @Column({ type: "text", nullable: true })
  DescripcionCompleta: string;

  @Column({ type: "boolean", default: false })
  RequierePreAprobacion: boolean;

  @Column({ type: "boolean", default: true })
  Estado: boolean;

  @Column({ type: "boolean", default: false })
  Autogenerado: boolean;

  @Column({ type: "boolean", default: false })
  AsignarFecha: boolean;

  @Column({ type: "timestamp", nullable: true })
  Fecha: Date | null;

  @Column({ type: "boolean", nullable: true })
  RequiereAprobacion: boolean | null;

  @Column({ type: "int", nullable: true })
  idTipoTramite: number | null;

  @Column({ type: "int", nullable: true })
  tipoTramite: number | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  Categoria: string;

  @OneToMany(() => Cuentatramite, (cuentatramite) => cuentatramite.TRAMITE)
  CUENTATRAMITE: Cuentatramite[];

  @OneToMany(
    () => ConfiguracionTramite,
    (configuracion) => configuracion.TRAMITE
  )
  CONFIGURACIONTRAMITE: ConfiguracionTramite[];

  @OneToMany(
    () => SolicitudActualizacion,
    (solicitudActualizacion) => solicitudActualizacion.TRAMITE)
  SOLICITUDACTUALIZACION: SolicitudActualizacion[];
  
}
