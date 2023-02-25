import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { DespesaEntity } from './entities/despesa.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { DespesaRepository } from './despesa.repository';
import { DespesaValidacoes } from './validacoes/despesa-validacoes';

@Injectable()
export class DespesasService {
  constructor(
    @InjectRepository(DespesaEntity)
    private depesaRepository: DespesaRepository,
    private readonly depesasValidacoes: DespesaValidacoes,
  ) {}

  create(createDespesaDto: CreateDespesaDto) {
    return 'This action adds a new despesa';
  }

  async findAll(): Promise<DespesaEntity[]> {
    const despesas = await this.depesaRepository.findBy({ ativo: 1 });
    if (!despesas.length) {
      throw new HttpException(
        'Nenhuma despesa encontrada.',
        HttpStatus.NOT_FOUND,
      );
    }

    return despesas;
  }

  async findOne(id: number): Promise<DespesaEntity> {
    const receita = await this.depesasValidacoes.retornaDespesaExistente(id);

    return receita;
  }

  update(id: number, updateDespesaDto: UpdateDespesaDto) {
    return `This action updates a #${id} despesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} despesa`;
  }
}
