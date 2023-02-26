import { FiltraReceitaMesAnoDTO } from './dto/filtra-receita-mes-ano.dto';
import { ListReceitaDTO } from './dto/list-receita.dto';
import { UpdateReceitaDTO } from './dto/update-receita.dto';
import { ResponseDeleteReceitaDTO } from './dto/response-deleteReceita.dto';
import { ResponseDetalhamentoDTO } from './dto/response-detalhamento.dto';
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
import { ReceitasService } from './receitas.service';
import { Receita } from './entities/receita.entity';
import { CreateReceitaDTO } from './dto/create-receita.dto';

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
  async detalhar(@Param('id') id: number): Promise<ResponseDetalhamentoDTO> {
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
    @Param() filtraReceitaMesAnoDTO: FiltraReceitaMesAnoDTO,
  ): Promise<Receita[]> {
    return await this.receitasService.filtraReceitaMesAnoDTO(
      filtraReceitaMesAnoDTO,
    );
  }
}
