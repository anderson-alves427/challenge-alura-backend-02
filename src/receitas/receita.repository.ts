import type { Repository } from 'typeorm';
import { ReceitaEntity } from './entities/receita.entity';

export interface ReceitaRepository extends Repository<ReceitaEntity> {
  this: Repository<ReceitaEntity>;

  findReceita(): Promise<ReceitaEntity[]>;

  findReceitasDuplicadasMesmoMes(
    numeracaoMesDaReceita: number,
    descricao: string,
  ): Promise<ReceitaEntity[]>;
}

export const customReceitaRepositoryMethods: Pick<
  ReceitaRepository,
  'findReceita' | 'findReceitasDuplicadasMesmoMes'
> = {
  async findReceita() {
    return await this.find();
  },

  async findReceitasDuplicadasMesmoMes(
    this: Repository<ReceitaEntity>,
    numeracaoMesDaReceita,
    descricao,
  ) {
    const receitasDuplicadasMesmoMes = await this.createQueryBuilder()
      .select('receita')
      .from(ReceitaEntity, 'receita')
      .where('MONTH(receita.data) = :data AND receita.descricao = :descricao', {
        data: numeracaoMesDaReceita,
        descricao: descricao,
      })
      .getMany();

    return receitasDuplicadasMesmoMes;
  },
};
