import type { Repository } from 'typeorm';
import { DespesaEntity } from './entities/despesa.entity';

export interface DespesaRepository extends Repository<DespesaEntity> {
  this: Repository<DespesaEntity>;

  findDespesasDuplicadasMesmoMes(
    numeracaoMesDaDespesa: number,
    descricao: string,
  ): Promise<DespesaEntity[]>;
}

export const customDespesaRepositoryMethods: Pick<
  DespesaRepository,
  'findDespesasDuplicadasMesmoMes'
> = {
  async findDespesasDuplicadasMesmoMes(
    this: Repository<DespesaEntity>,
    numeracaoMesDaDespesa,
    descricao,
  ) {
    const DespesasDuplicadasMesmoMes = await this.createQueryBuilder()
      .select('despesa')
      .from(DespesaEntity, 'despesa')
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
