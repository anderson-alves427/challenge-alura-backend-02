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
} from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { ReceitaEntity } from './entities/receita.entity';
import { CreateReceitaDTO } from './dto/create-receita.dto';

@Controller('receitas')
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @Get()
  async getReceitas(): Promise<ReceitaEntity[]> {
    return await this.receitasService.findReceitas();
  }

  @Post()
  async createReceitas(
    @Body() dados: CreateReceitaDTO,
  ): Promise<ReceitaEntity> {
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
  ): Promise<ReceitaEntity> {
    return await this.receitasService.atualizarReceitas(id, dados);
  }

  @Delete(':id')
  async deletar(@Param('id') id: number): Promise<ResponseDeleteReceitaDTO> {
    return await this.receitasService.deletarReceita(id);
  }
}
