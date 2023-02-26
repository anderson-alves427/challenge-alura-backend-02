import type { Repository } from 'typeorm';
import { Receita } from './entities/receita.entity';

export interface ReceitaRepository extends Repository<Receita> {
  this: Repository<Receita>;

  findReceitasDuplicadasMesmoMes(
    numeracaoMesDaReceita: number,
    descricao: string,
  ): Promise<Receita[]>;

  findReceitasPorMesEAno(mes: number, ano: number): Promise<Receita[]>;
}

export const customReceitaRepositoryMethods: Pick<
  ReceitaRepository,
  'findReceitasDuplicadasMesmoMes' | 'findReceitasPorMesEAno'
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
  async findReceitasPorMesEAno(mes: number, ano: number): Promise<Receita[]> {
    const receitasDuplicadasMesmoMes = await this.createQueryBuilder()
      .select('receitas')
      .from(Receita, 'receitas')
      .where(
        'MONTH(receitas.data) = :mes AND YEAR(receitas.data) = :ano AND receitas.ativo = 1',
        {
          mes: mes,
          ano: ano,
        },
      )
      .getMany();

    return receitasDuplicadasMesmoMes;
  },
};
