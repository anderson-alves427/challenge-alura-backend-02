import { CreateDespesaDto } from '../dtos/despesas/create-despesa.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { DespesaRepository } from '../repositories/despesa.repository';
import { Despesa } from '../entities/despesa.entity';

@Injectable()
export class DespesaValidacoes {
  constructor(
    @InjectRepository(Despesa)
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

  async retornaDespesaExistente(id: number): Promise<Despesa> {
    const Despesa = await this.despesaRepository.findOneBy({
      id: id,
      ativo: 1,
    });
    if (!Despesa || !Despesa.ativo) {
      throw new HttpException('Despesa não existente', HttpStatus.NOT_FOUND);
    }

    return Despesa;
  }

  async insereCategoria(createDespesaDto: CreateDespesaDto): Promise<void> {
    const categoria = createDespesaDto?.categoria
      ? createDespesaDto.categoria
      : 'Outros';
    createDespesaDto.categoria = categoria;
  }
}
