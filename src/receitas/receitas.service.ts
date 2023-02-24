import { CreateReceitaDTO } from './dto/create-receita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReceitaEntity } from './entity/receita.entity';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(ReceitaEntity)
    private readonly receitaRepository: Repository<ReceitaEntity>,
  ) {}

  async findReceitas(): Promise<ReceitaEntity[]> {
    return await this.receitaRepository.find();
  }

  async create(dados: CreateReceitaDTO): Promise<ReceitaEntity> {
    return await this.receitaRepository.save(
      this.receitaRepository.create(dados),
    );
  }
}
