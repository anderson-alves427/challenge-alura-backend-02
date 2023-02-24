import { Controller, Get, Body, Post } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { ReceitaEntity } from './entity/receita.entity';
import { CreateReceitasDTO } from './dto/create-receitas.dto';

@Controller('receitas')
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @Get()
  async getReceitas(): Promise<ReceitaEntity[]> {
    return await this.receitasService.findReceitas();
  }

  @Post()
  async createReceitas(
    @Body() dados: CreateReceitasDTO,
  ): Promise<ReceitaEntity> {
    return await this.receitasService.create(dados);
  }
}
