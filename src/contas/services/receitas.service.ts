import { HttpStatus } from '@nestjs/common/enums';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { Receita } from '../entities/receita.entity';
import { ReceitaRepository } from '../repositories/receita.repository';
import { ReceitasValidacoes } from '../validacoes/receitas-validacoes';
import { ListReceitaDTO } from '../dtos/receitas/list-receita.dto';
import { CreateReceitaDTO } from '../dtos/receitas/create-receita.dto';
import { ResponseDetalhamentoReceitaDTO } from '../dtos/receitas/response-detalhamento.dto';
import { UpdateReceitaDTO } from '../dtos/receitas/update-receita.dto';
import { ResponseDeleteReceitaDTO } from '../dtos/receitas/response-deleteReceita.dto';
import { FiltraReceitaMesAnoDTO } from '../dtos/receitas/filtra-receita-mes-ano.dto';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: ReceitaRepository,

    private readonly receitasValidacoes: ReceitasValidacoes,
  ) {}

  async findReceitas(listReceitasDTO: ListReceitaDTO): Promise<Receita[]> {
    if (!listReceitasDTO?.descricao) {
      return await this.receitaRepository.findBy({ ativo: 1 });
    }

    return await this.receitaRepository.find({
      where: { descricao: Like(`%${listReceitasDTO.descricao}%`), ativo: 1 },
    });
  }

  async create(dados: CreateReceitaDTO): Promise<Receita> {
    const numeracaoMesDaReceita = dados.data.getMonth() + 1;
    await this.receitasValidacoes.verificaSeReceitaEDuplicada(
      numeracaoMesDaReceita,
      dados.descricao,
    );

    return await this.receitaRepository.save(
      this.receitaRepository.create(dados),
    );
  }

  async getReceitaById(id: number): Promise<ResponseDetalhamentoReceitaDTO> {
    const receita = await this.receitasValidacoes.retornaReceitaExistente(id);

    return receita;
  }

  async atualizarReceitas(
    id: number,
    dados: UpdateReceitaDTO,
  ): Promise<Receita> {
    const receita = await this.receitasValidacoes.retornaReceitaExistente(id);
    const receitaAtualizada = Object.assign(receita, dados);
    await this.receitaRepository.save(receitaAtualizada);

    return receitaAtualizada;
  }

  async deletarReceita(id: number): Promise<ResponseDeleteReceitaDTO> {
    const receita = await this.receitasValidacoes.retornaReceitaExistente(id);
    receita.ativo = 0;
    await this.receitaRepository.save(receita);
    return {
      message: 'Delecao ocorrida com sucesso',
    };
  }

  async filtraReceitaMesAnoDTO(
    filtraReceitaMesAnoDTO: FiltraReceitaMesAnoDTO,
  ): Promise<Receita[]> {
    const receitas = await this.receitaRepository.findReceitasPorMesEAno(
      +filtraReceitaMesAnoDTO.mes,
      +filtraReceitaMesAnoDTO.ano,
    );
    if (!receitas.length) {
      throw new HttpException(
        'Nenhuma receita encontrada com esse filtro de mês e ano',
        HttpStatus.NOT_FOUND,
      );
    }

    return receitas;
  }
}
