import { ResponseDetalhamentoDespesaDTO } from './dto/response-detalhamento-despesa.dto';
import { DespesaEntity } from './entities/despesa.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Controller('despesas')
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  async create(
    @Body() createDespesaDto: CreateDespesaDto,
  ): Promise<DespesaEntity> {
    return await this.despesasService.create(createDespesaDto);
  }

  @Get()
  async findAll(): Promise<DespesaEntity[]> {
    return await this.despesasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DespesaEntity> {
    return await this.despesasService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDespesaDto: UpdateDespesaDto,
  ): Promise<ResponseDetalhamentoDespesaDTO> {
    return await this.despesasService.update(id, updateDespesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.despesasService.remove(+id);
  }
}
