import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'depesas' })
export class DespesaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 250 })
  descricao: string;

  @Column('decimal')
  valor: number;

  @Column('date')
  data: Date;

  constructor(todo?: Partial<DespesaEntity>) {
    this.id = todo?.id;
    this.descricao = todo?.descricao;
    this.valor = todo?.valor;
    this.data = todo?.data;
  }
}
