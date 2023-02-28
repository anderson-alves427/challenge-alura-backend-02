import type { Repository } from 'typeorm';
import { Despesa } from '../entities/despesa.entity';

export interface DespesaRepository extends Repository<Despesa> {
  this: Repository<Despesa>;

  findDespesasDuplicadasMesmoMes(
    numeracaoMesDaDespesa: number,
    descricao: string,
  ): Promise<Despesa[]>;

  findDespesasPorMesEAno(mes: number, ano: number): Promise<Despesa[]>;
}

export const customDespesaRepositoryMethods: Pick<
  DespesaRepository,
  'findDespesasDuplicadasMesmoMes' | 'findDespesasPorMesEAno'
> = {
  async findDespesasDuplicadasMesmoMes(
    this: Repository<Despesa>,
    numeracaoMesDaDespesa,
    descricao,
  ) {
    const DespesasDuplicadasMesmoMes = await this.createQueryBuilder()
      .select('despesas')
      .from(Despesa, 'despesas')
      .where(
        'MONTH(despesas.data) = :data AND despesas.descricao = :descricao AND despesas.ativo = 1',
        {
          data: numeracaoMesDaDespesa,
          descricao: descricao,
        },
      )
      .getMany();

    return DespesasDuplicadasMesmoMes;
  },
  async findDespesasPorMesEAno(mes: number, ano: number): Promise<Despesa[]> {
    const receitasDuplicadasMesmoMes = await this.createQueryBuilder()
      .select('despesas')
      .from(Despesa, 'despesas')
      .where(
        'MONTH(despesas.data) = :mes AND YEAR(despesas.data) = :ano AND despesas.ativo = 1',
        {
          mes: mes,
          ano: ano,
        },
      )
      .getMany();

    return receitasDuplicadasMesmoMes;
  },
};
