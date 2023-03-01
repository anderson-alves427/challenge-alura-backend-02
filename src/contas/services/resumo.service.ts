import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiltraMesAnoDTO } from '../dtos/filtra-mes-ano.dto';
import { Despesa } from '../entities/despesa.entity';
import { Receita } from '../entities/receita.entity';
import { DespesaRepository } from '../repositories/despesa.repository';
import { ReceitaRepository } from '../repositories/receita.repository';
import { DespesasService } from './despesas.service';
import { ReceitasService } from './receitas.service';

@Injectable()
export class ResumoService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: ReceitaRepository,
    @InjectRepository(Despesa)
    private despesaRepository: DespesaRepository,
    private readonly receitasService: ReceitasService,
    private readonly despesasService: DespesasService,
  ) {}

  async resumoMensal(dto: FiltraMesAnoDTO): Promise<any> {
    const valorTotalReceita = await this.receitaRepository.somaTotalReceitas(
      dto.ano,
      dto.mes,
    );

    const despesas = await this.despesaRepository.findDespesasPorMesEAno(
      dto.mes,
      dto.ano,
    );
  }
}
