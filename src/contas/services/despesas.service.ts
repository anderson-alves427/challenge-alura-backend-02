import { InjectRepository } from '@nestjs/typeorm';
import { Despesa } from '../entities/despesa.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDespesaDto } from '../dtos/despesas/create-despesa.dto';
import { DespesaRepository } from '../repositories/despesa.repository';
import { DespesaValidacoes } from '../validacoes/despesa-validacoes';
import { Like } from 'typeorm';
import { ListDespesaDTO } from '../dtos/despesas/list-despesa.dto';
import { ResponseDetalhamentoDespesaDTO } from '../dtos/despesas/response-detalhamento-despesa.dto';
import { UpdateDespesaDto } from '../dtos/despesas/update-despesa.dto';
import { ResponseDeletaDespesaDTO } from '../dtos/despesas/response-deleta-despesa.dto';
import { FiltraDespesaMesAnoDTO } from '../dtos/despesas/filtra-despesa-mes-ano.dto';

@Injectable()
export class DespesasService {
  constructor(
    @InjectRepository(Despesa)
    private depesaRepository: DespesaRepository,
    private readonly depesasValidacoes: DespesaValidacoes,
  ) {}

  async create(createDespesaDto: CreateDespesaDto): Promise<Despesa> {
    const numeracaoMesDaDespesa = createDespesaDto.data.getMonth() + 1;
    await this.depesasValidacoes.verificaSeDespesaEDuplicada(
      numeracaoMesDaDespesa,
      createDespesaDto.descricao,
    );

    this.depesasValidacoes.insereCategoria(createDespesaDto);
    return await this.depesaRepository.save(
      this.depesaRepository.create(createDespesaDto),
    );
  }

  async findAll(listDespesaDTO: ListDespesaDTO): Promise<Despesa[]> {
    if (!listDespesaDTO?.descricao) {
      return await this.depesaRepository.findBy({ ativo: 1 });
    }
    return await this.depesaRepository.find({
      where: { descricao: Like(`%${listDespesaDTO.descricao}%`), ativo: 1 },
    });
  }

  async findOne(id: number): Promise<Despesa> {
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

  async remove(id: number): Promise<ResponseDeletaDespesaDTO> {
    const despesa = await this.depesasValidacoes.retornaDespesaExistente(id);
    despesa.ativo = 0;
    await this.depesaRepository.save(despesa);
    return {
      message: 'Deleção ocorrida com sucesso',
    };
  }

  async filtraDespesaMesAnoDTO(
    filtraDespesaMesAnoDTO: FiltraDespesaMesAnoDTO,
  ): Promise<Despesa[]> {
    const receitas = await this.depesaRepository.findDespesasPorMesEAno(
      +filtraDespesaMesAnoDTO.mes,
      +filtraDespesaMesAnoDTO.ano,
    );
    if (!receitas.length) {
      throw new HttpException(
        'Nenhuma despesa encontrada com esse filtro de mês e ano',
        HttpStatus.NOT_FOUND,
      );
    }

    return receitas;
  }
}
