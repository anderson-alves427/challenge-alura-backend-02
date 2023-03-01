import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'receitas' })
export class Receita {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 250 })
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column('date')
  data: Date;

  @Column('tinyint', { default: 1 })
  ativo: number;
}
