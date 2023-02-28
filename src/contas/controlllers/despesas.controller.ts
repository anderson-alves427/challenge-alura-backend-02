import { Despesa } from '../entities/despesa.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DespesasService } from '../services/despesas.service';
import { CreateDespesaDto } from '../dtos/despesas/create-despesa.dto';
import { ListDespesaDTO } from '../dtos/despesas/list-despesa.dto';
import { UpdateDespesaDto } from '../dtos/despesas/update-despesa.dto';
import { ResponseDetalhamentoDespesaDTO } from '../dtos/despesas/response-detalhamento-despesa.dto';
import { ResponseDeletaDespesaDTO } from '../dtos/despesas/response-deleta-despesa.dto';
import { FiltraDespesaMesAnoDTO } from '../dtos/despesas/filtra-despesa-mes-ano.dto';

@Controller('despesas')
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  async create(@Body() createDespesaDto: CreateDespesaDto): Promise<Despesa> {
    return await this.despesasService.create(createDespesaDto);
  }

  @Get()
  async findAll(@Query() listDespesaDTO: ListDespesaDTO): Promise<Despesa[]> {
    return await this.despesasService.findAll(listDespesaDTO);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Despesa> {
    return await this.despesasService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDespesaDto: UpdateDespesaDto,
  ): Promise<ResponseDetalhamentoDespesaDTO> {
    return await this.despesasService.update(+id, updateDespesaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDeletaDespesaDTO> {
    return await this.despesasService.remove(+id);
  }

  @Get(':ano/:mes')
  async filtraDespesaMesEAno(
    @Param() filtraDespesaMesAnoDTO: FiltraDespesaMesAnoDTO,
  ): Promise<Despesa[]> {
    return await this.despesasService.filtraDespesaMesAnoDTO(
      filtraDespesaMesAnoDTO,
    );
  }
}
