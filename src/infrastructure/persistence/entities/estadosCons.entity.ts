import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SolicitudActualizacion } from "./solicituActualización.entity";

@Entity("EstadosCons")
export class EstadosCons {
  @PrimaryGeneratedColumn({ name: "idEstado" })
  idEstado: number;

  @Column({ type: "int", nullable: true })
  tipoTramite: number | null;

  @Column({ type: "int", nullable: true })
  idStepts: number | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  codigoEstado: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  estado: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  titulo: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  accion: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  nombre: string;

  // Relación con SolicitudActualizacion
  @OneToMany(
    () => SolicitudActualizacion,
    (solicitud) => solicitud.EstadosCons
  )
  SolicitudActualizacion: SolicitudActualizacion[];
}
