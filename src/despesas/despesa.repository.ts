import type { Repository } from 'typeorm';
import { Despesa } from './entities/despesa.entity';

export interface DespesaRepository extends Repository<Despesa> {
  this: Repository<Despesa>;

  findDespesasDuplicadasMesmoMes(
    numeracaoMesDaDespesa: number,
    descricao: string,
  ): Promise<Despesa[]>;
}

export const customDespesaRepositoryMethods: Pick<
  DespesaRepository,
  'findDespesasDuplicadasMesmoMes'
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
};
