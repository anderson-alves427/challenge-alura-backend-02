import { HttpStatus } from '@nestjs/common/enums';
import { ReceitaEntity } from 'src/receitas/entities/receita.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { ReceitaRepository } from '../receita.repository';

@Injectable()
export class ReceitasValidacoes {
  constructor(
    @InjectRepository(ReceitaEntity)
    private receitaRepository: ReceitaRepository,
  ) {}

  async verificaSeReceitaEDuplicada(
    numeracaoMesDaReceita: number,
    descricao: string,
  ): Promise<void> {
    const receitasDuplicadasMesmoMes =
      await this.receitaRepository.findReceitasDuplicadasMesmoMes(
        numeracaoMesDaReceita,
        descricao,
      );

    if (receitasDuplicadasMesmoMes.length) {
      throw new HttpException(
        'Não é permitido receitas duplicadas no mesmo mês.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async retornaReceitaExistente(id: number): Promise<ReceitaEntity> {
    const receita = await this.receitaRepository.findOneBy({
      id: id,
      ativo: 1,
    });
    if (!receita || !receita.ativo) {
      throw new HttpException('Receita não existente', HttpStatus.NOT_FOUND);
    }

    return receita;
  }
}
