import { HttpStatus } from '@nestjs/common/enums';
import { DespesaEntity } from 'src/Despesas/entities/Despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { DespesaRepository } from '../despesa.repository';

@Injectable()
export class DespesaValidacoes {
  constructor(
    @InjectRepository(DespesaEntity)
    private despesaRepository: DespesaRepository,
  ) {}

  async verificaSeDespesaEDuplicada(
    numeracaoMesDaDespesa: number,
    descricao: string,
  ): Promise<void> {
    const DespesasDuplicadasMesmoMes =
      await this.despesaRepository.findDespesasDuplicadasMesmoMes(
        numeracaoMesDaDespesa,
        descricao,
      );

    if (DespesasDuplicadasMesmoMes.length) {
      throw new HttpException(
        'Não é permitido Despesas duplicadas no mesmo mês.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async retornaDespesaExistente(id: number): Promise<DespesaEntity> {
    const Despesa = await this.despesaRepository.findOneBy({
      id: id,
      ativo: 1,
    });
    if (!Despesa || !Despesa.ativo) {
      throw new HttpException('Despesa não existente', HttpStatus.NOT_FOUND);
    }

    return Despesa;
  }
}
