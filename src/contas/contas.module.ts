import { ResumoService } from './services/resumo.service';
import {
  TypeOrmModule,
  getRepositoryToken,
  getDataSourceToken,
} from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DespesasService } from './services/despesas.service';
import { DespesasController } from './controllers/despesas.controller';
import { Despesa } from './entities/despesa.entity';
import { DataSource } from 'typeorm';
import { customDespesaRepositoryMethods } from './repositories/despesa.repository';
import { DespesaValidacoes } from './validacoes/despesa-validacoes';
import { Receita } from './entities/receita.entity';
import { customReceitaRepositoryMethods } from './repositories/receita.repository';
import { ReceitasService } from './services/receitas.service';
import { ReceitasValidacoes } from './validacoes/receitas-validacoes';
import { ReceitasController } from './controllers/receitas.controller';
import { ResumoController } from './controllers/resumo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa, Receita])],
  controllers: [DespesasController, ReceitasController, ResumoController],
  providers: [
    DespesasService,
    ReceitasService,
    ResumoService,
    DespesaValidacoes,
    ReceitasValidacoes,
    {
      provide: getRepositoryToken(Despesa),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(Despesa)
          .extend(customDespesaRepositoryMethods);
      },
    },
    {
      provide: getRepositoryToken(Receita),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(Receita)
          .extend(customReceitaRepositoryMethods);
      },
    },
  ],
})
export class ContasModule {}
