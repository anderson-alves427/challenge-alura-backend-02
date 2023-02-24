import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'receitas' })
export class ReceitaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 250 })
  descricao: string;

  @Column('decimal')
  valor: number;

  @Column('date')
  data: Date;

  constructor(todo?: Partial<ReceitaEntity>) {
    this.id = todo?.id;
    this.descricao = todo?.descricao;
    this.valor = todo?.valor;
    this.data = todo?.data;
  }
}
