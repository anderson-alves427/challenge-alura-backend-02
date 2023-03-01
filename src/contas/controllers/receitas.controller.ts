import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateReceitaDTO } from '../dtos/receitas/create-receita.dto';
import { ListReceitaDTO } from '../dtos/receitas/list-receita.dto';
import { Receita } from '../entities/receita.entity';
import { ReceitasService } from '../services/receitas.service';
import { UpdateReceitaDTO } from '../dtos/receitas/update-receita.dto';
import { ResponseDeleteReceitaDTO } from '../dtos/receitas/response-deleteReceita.dto';
import { FiltraReceitaMesAnoDTO } from '../dtos/receitas/filtra-receita-mes-ano.dto';
import { ResponseDetalhamentoReceitaDTO } from '../dtos/receitas/response-detalhamento.dto';
import { FiltraMesAnoDTO } from '../dtos/filtra-mes-ano.dto';

@Controller('receitas')
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @Get()
  async getReceitas(
    @Query() listReceitasDTO: ListReceitaDTO,
  ): Promise<Receita[]> {
    return await this.receitasService.findReceitas(listReceitasDTO);
  }

  @Post()
  async createReceitas(@Body() dados: CreateReceitaDTO): Promise<Receita> {
    return await this.receitasService.create(dados);
  }

  @Get(':id')
  async detalhar(
    @Param('id') id: number,
  ): Promise<ResponseDetalhamentoReceitaDTO> {
    return await this.receitasService.getReceitaById(id);
  }

  @Put(':id')
  async atualizar(
    @Param('id') id: number,
    @Body() dados: UpdateReceitaDTO,
  ): Promise<Receita> {
    return await this.receitasService.atualizarReceitas(id, dados);
  }

  @Delete(':id')
  async deletar(@Param('id') id: number): Promise<ResponseDeleteReceitaDTO> {
    return await this.receitasService.deletarReceita(id);
  }

  @Get(':ano/:mes')
  async filtraReceitaMesEAno(
    @Param() filtraMesAnoDTO: FiltraMesAnoDTO,
  ): Promise<Receita[]> {
    return await this.receitasService.filtraReceitaMesAnoDTO(filtraMesAnoDTO);
  }
}
