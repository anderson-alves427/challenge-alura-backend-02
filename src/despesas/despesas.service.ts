import { ResponseDetalhamentoDespesaDTO } from './dto/response-detalhamento-despesa.dto';
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

  async create(createDespesaDto: CreateDespesaDto): Promise<DespesaEntity> {
    const numeracaoMesDaDespesa = createDespesaDto.data.getMonth() + 1;
    await this.depesasValidacoes.verificaSeDespesaEDuplicada(
      numeracaoMesDaDespesa,
      createDespesaDto.descricao,
    );
    return await this.depesaRepository.save(
      this.depesaRepository.create(createDespesaDto),
    );
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

  async update(
    id: number,
    updateDespesaDto: UpdateDespesaDto,
  ): Promise<ResponseDetalhamentoDespesaDTO> {
    const despesa = await this.depesasValidacoes.retornaDespesaExistente(id);
    const despesaAtualizada = Object.assign(despesa, updateDespesaDto);
    await this.depesaRepository.save(despesaAtualizada);
    return despesaAtualizada;
  }

  remove(id: number) {
    return `This action removes a #${id} despesa`;
  }
}
