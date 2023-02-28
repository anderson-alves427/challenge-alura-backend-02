import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiltraMesAnoDTO } from '../dtos/filtra-mes-ano.dto';
import { Despesa } from '../entities/despesa.entity';
import { Receita } from '../entities/receita.entity';
import { DespesaRepository } from '../repositories/despesa.repository';
import { ReceitaRepository } from '../repositories/receita.repository';

@Injectable()
export class ResumoService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: ReceitaRepository,

    @InjectRepository(Despesa)
    private despesaRepository: DespesaRepository,
  ) {}

  async resumoMensal(dto: FiltraMesAnoDTO): Promise<any> {
    return {
      message: 'teste',
    };
  }
}
