import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('varchar', { length: 250 })
  categoria: string;
}
