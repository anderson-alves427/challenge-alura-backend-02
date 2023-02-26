import { HttpStatus } from '@nestjs/common/enums';
import { FiltraDespesaMesAnoDTO } from './dto/filtra-despesa-mes-ano.dto';
import { ListDespesaDTO } from './dto/list-despesa.dto';
import { ResponseDetalhamentoDespesaDTO } from './dto/response-detalhamento-despesa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Despesa } from './entities/despesa.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { DespesaRepository } from './despesa.repository';
import { DespesaValidacoes } from './validacoes/despesa-validacoes';
import { ResponseDeletaDespesaDTO } from './dto/response-deleta-despesa.dto';
import { Like } from 'typeorm';

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
