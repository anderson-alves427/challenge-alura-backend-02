import { Controller, Get, Param } from '@nestjs/common';
import { FiltraMesAnoDTO } from '../dtos/filtra-mes-ano.dto';
import { ResumoService } from '../services/resumo.service';

@Controller('resumo')
export class ResumoController {
  constructor(private readonly resumoService: ResumoService) {}

  @Get('/:ano/:mes')
  async resumoMensal(@Param() dto: FiltraMesAnoDTO): Promise<any> {
    return await this.resumoService.resumoMensal(dto);
  }
}
