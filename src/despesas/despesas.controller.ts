import { DespesaEntity } from './entities/despesa.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
  create(@Body() createDespesaDto: CreateDespesaDto): Promise<DespesaEntity> {
    return this.despesasService.create(createDespesaDto);
  }

  @Get()
  async findAll(): Promise<DespesaEntity[]> {
    return await this.despesasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DespesaEntity> {
    return await this.despesasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDespesaDto: UpdateDespesaDto) {
    return this.despesasService.update(+id, updateDespesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.despesasService.remove(+id);
  }
}
