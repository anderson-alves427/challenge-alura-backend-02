import { Controller, Get, Body, Post } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { ReceitaEntity } from './entity/receita.entity';
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
    console.log(dados);
    return await this.receitasService.create(dados);
  }
}
