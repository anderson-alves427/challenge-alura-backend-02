import { Categoria } from './categoria.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'despesas' })
export class Despesa {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 250 })
  descricao: string;

  @Column('decimal')
  valor: number;

  @Column('date')
  data: Date;

  @Column('tinyint', { default: 1 })
  ativo: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.categorias)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;
}
