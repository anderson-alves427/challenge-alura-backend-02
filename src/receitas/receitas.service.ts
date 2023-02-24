import { CreateReceitaDTO } from './dto/create-receita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReceitaEntity } from './entity/receita.entity';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(ReceitaEntity)
    private readonly receitaRepository: Repository<ReceitaEntity>,
  ) {}

  async findReceitas(): Promise<ReceitaEntity[]> {
    return await this.receitaRepository.find();
  }

  async create(dados: CreateReceitaDTO): Promise<ReceitaEntity> {
    const numeracaoMesDaReceita = dados.data.getMonth() + 1;
    const receitasDuplicadasMesmoMes = await this.receitaRepository
      .createQueryBuilder()
      .select('receita')
      .from(ReceitaEntity, 'receita')
      .where('MONTH(receita.data) = :data', { data: numeracaoMesDaReceita })
      .getMany();

    if (receitasDuplicadasMesmoMes.length) {
      throw new HttpException(
        'Não é permitido receitas duplicadas no mesmo mês.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.receitaRepository.save(
      this.receitaRepository.create(dados),
    );
  }
}
