import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Tramite } from "./tramite.entity";

@Entity("CONFIGURACIONTRAMITE")
export class ConfiguracionTramite {
  @PrimaryGeneratedColumn({ name: "id_configuracion" })
  id_configuracion: number;

  @Column({ type: "varchar", length: 255 })
  nombre_parametro: string;

  @Column({ type: "int", nullable: true })
  idTramite: number | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  valor: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  tipoDato: string;

  // Relación muchos a uno con TRAMITE
  @ManyToOne(() => Tramite, (tramite) => tramite.CONFIGURACIONTRAMITE)
  TRAMITE: Tramite;
}
