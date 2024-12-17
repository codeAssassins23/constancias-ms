import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tramite } from "./tramite.entity";
import { EstadosCons } from "./estadosCons.entity";

@Entity("SolicitudActualizacion")
export class SolicitudActualizacion {
  @PrimaryGeneratedColumn({ name: "idSolicitudAc" })
  idSolicitudAc: number;

  @Column({ type: "int" })
  idTramite: number;

  @Column({ type: "int" })
  idestado: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  cod_utp: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  emplid: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  url_foto: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  periodo: string;

  @Column({ type: "text", nullable: true })
  comentario: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  procedencia: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  monto: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  item_nbr: string;

  @Column({ type: "timestamp" })
  fecha_registro: Date;

  @Column({ type: "timestamp", nullable: true })
  fecha_modificacion: Date | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  CodigoCasoCRM: string;

  @Column({ type: "int", nullable: true })
  idHistorico: number | null;

  // Relación con TRAMITE
  @ManyToOne(() => Tramite, (tramite) => tramite.SOLICITUDACTUALIZACION)
  TRAMITE: Tramite;

  // Relación con EstadosCons
  @ManyToOne(() => EstadosCons, (estado) => estado.SolicitudActualizacion)
  EstadosCons: EstadosCons;
}
