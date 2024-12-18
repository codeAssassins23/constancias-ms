import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pagos')
export class Pagos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'item', type: 'varchar' })
  item: string;

  @Column({ name: 'descr', type: 'varchar' })
  descripcionItem: string;

  @Column({ name: 'default_amt', type: 'decimal', precision: 10, scale: 2 })
  montoProgramado: number;
}