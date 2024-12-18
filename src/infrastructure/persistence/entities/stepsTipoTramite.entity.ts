import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { EstadosCons } from "./estadosCons.entity";

@Entity("StepsTipoTramite")
export class StepsTipoTramite {
  @PrimaryGeneratedColumn({ name: "Id_steps" })
  Id_steps: number;

  @Column({ type: "int" })
  TipoTramite: number;

  @Column({ type: "int" })
  Orden: number;

  @Column({ type: "varchar", length: 255 })
  Nombre: string;

  @OneToMany(() => EstadosCons, (estado) => estado.StepsTipoTramite)
  EstadosCons: EstadosCons[];
}
