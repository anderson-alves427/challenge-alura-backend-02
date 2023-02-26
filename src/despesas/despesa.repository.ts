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
      .select('despesa')
      .from(Despesa, 'despesa')
      .where(
        'MONTH(despesa.data) = :data AND despesa.descricao = :descricao AND despesa.ativo = 1',
        {
          data: numeracaoMesDaDespesa,
          descricao: descricao,
        },
      )
      .getMany();

    return DespesasDuplicadasMesmoMes;
  },
};
