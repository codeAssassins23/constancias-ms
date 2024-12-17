import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Cuentatramite } from "./cuentaTramite.entity";

@Entity("CUENTATRAMITE_REINCORPORACION")
export class CuentatramiteReincorporacion {
  @PrimaryGeneratedColumn()
  Codigo: number;

  @Column({ type: "int", nullable: true })
  CodigoCuentaTramite: number | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  ItemCampus: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  ItemCarrera: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  ItemModalidad: string;

  // Relación muchos a uno con CUENTATRAMITE
  @ManyToOne(() => Cuentatramite, (cuentatramite) => cuentatramite.CUENTATRAMITE_REINCORPORACION)
  CUENTATRAMITE: Cuentatramite;
}
