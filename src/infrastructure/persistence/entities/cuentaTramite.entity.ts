import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Tramite } from "./tramite.entity";
import { CuentatramiteReincorporacion } from "./cuentatramiteReincorporacion.entity";

@Entity("CUENTATRAMITE")
export class Cuentatramite {
  @PrimaryGeneratedColumn()
  Codigo: number;

  @Column({ type: "int" })
  CodigoTramite: number;

  @Column({ type: "varchar", length: 255 })
  Campus: string;

  @Column({ type: "varchar", length: 255 })
  Cuenta: string;

  @Column({ type: "varchar", length: 255 })
  Item: string;

  // Relación muchos a uno con TRAMITE
  @ManyToOne(() => Tramite, (tramite) => tramite.CUENTATRAMITE)
  TRAMITE: Tramite;

  // Relación uno a muchos con CUENTATRAMITE_REINCORPORACION
  @OneToMany(
    () => CuentatramiteReincorporacion,
    (reincorporacion) => reincorporacion.CUENTATRAMITE
  )
  CUENTATRAMITE_REINCORPORACION: CuentatramiteReincorporacion[];
}
