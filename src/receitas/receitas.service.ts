import { UpdateReceitaDTO } from './dto/update-receita.dto';
import { ResponseDeleteReceitaDTO } from './dto/response-deleteReceita.dto';
import { ReceitasValidacoes } from './validacoes/receitas-validacoes';
import { CreateReceitaDTO } from './dto/create-receita.dto';
import { Injectable } from '@nestjs/common';
import { ReceitaEntity } from './entities/receita.entity';
import { ReceitaRepository } from './receita.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDetalhamentoDTO } from './dto/response-detalhamento.dto';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(ReceitaEntity)
    private receitaRepository: ReceitaRepository,

    private readonly receitasValidacoes: ReceitasValidacoes,
  ) {}

  async findReceitas(): Promise<ReceitaEntity[]> {
    return await this.receitaRepository.findBy({ ativo: 1 });
  }

  async create(dados: CreateReceitaDTO): Promise<ReceitaEntity> {
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
  ): Promise<ReceitaEntity> {
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
}
