import { CreateReceitaDTO } from './dto/create-receita.dto';
import { Injectable } from '@nestjs/common';
import { ReceitaEntity } from './entities/receita.entity';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ReceitaRepository } from './receita.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(ReceitaEntity)
    private receitaRepository: ReceitaRepository,
  ) {}

  async findReceitas(): Promise<ReceitaEntity[]> {
    return await this.receitaRepository.findReceita();
  }

  async create(dados: CreateReceitaDTO): Promise<ReceitaEntity> {
    const numeracaoMesDaReceita = dados.data.getMonth() + 1;
    const receitasDuplicadasMesmoMes =
      await this.receitaRepository.findReceitasDuplicadasMesmoMes(
        numeracaoMesDaReceita,
        dados.descricao,
      );

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
