import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Despesa } from './despesa.entity';

@Entity({ name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100 })
  titulo: string;

  @OneToMany(() => Despesa, (despesa) => despesa.categoria)
  categorias: Despesa[];
}
