import type { Repository } from 'typeorm';
import { Receita } from './entities/receita.entity';

export interface ReceitaRepository extends Repository<Receita> {
  this: Repository<Receita>;

  findReceitasDuplicadasMesmoMes(
    numeracaoMesDaReceita: number,
    descricao: string,
  ): Promise<Receita[]>;
}

export const customReceitaRepositoryMethods: Pick<
  ReceitaRepository,
  'findReceitasDuplicadasMesmoMes'
> = {
  async findReceitasDuplicadasMesmoMes(
    this: Repository<Receita>,
    numeracaoMesDaReceita,
    descricao,
  ) {
    const receitasDuplicadasMesmoMes = await this.createQueryBuilder()
      .select('receita')
      .from(Receita, 'receita')
      .where(
        'MONTH(receita.data) = :data AND receita.descricao = :descricao AND receita.ativo = 1',
        {
          data: numeracaoMesDaReceita,
          descricao: descricao,
        },
      )
      .getMany();

    return receitasDuplicadasMesmoMes;
  },
};
