import { HttpStatus } from '@nestjs/common/enums';
import { FiltraReceitaMesAnoDTO } from './dto/filtra-receita-mes-ano.dto';
import { ListReceitaDTO } from './dto/list-receita.dto';
import { UpdateReceitaDTO } from './dto/update-receita.dto';
import { ResponseDeleteReceitaDTO } from './dto/response-deleteReceita.dto';
import { ReceitasValidacoes } from './validacoes/receitas-validacoes';
import { CreateReceitaDTO } from './dto/create-receita.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { Receita } from './entities/receita.entity';
import { ReceitaRepository } from './receita.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDetalhamentoDTO } from './dto/response-detalhamento.dto';
import { Like } from 'typeorm';

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

  async getReceitaById(id: number): Promise<ResponseDetalhamentoDTO> {
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
        'Nenhuma receita encontrada com esse filtro de m??s e ano',
        HttpStatus.NOT_FOUND,
      );
    }

    return receitas;
  }
}
