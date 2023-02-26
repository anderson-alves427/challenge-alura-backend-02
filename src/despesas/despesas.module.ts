import {
  TypeOrmModule,
  getRepositoryToken,
  getDataSourceToken,
} from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { DespesasController } from './despesas.controller';
import { Despesa } from './entities/despesa.entity';
import { DataSource } from 'typeorm';
import { customDespesaRepositoryMethods } from './despesa.repository';
import { DespesaValidacoes } from './validacoes/despesa-validacoes';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa])],
  controllers: [DespesasController],
  providers: [
    DespesasService,
    DespesaValidacoes,
    {
      provide: getRepositoryToken(Despesa),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(Despesa)
          .extend(customDespesaRepositoryMethods);
      },
    },
  ],
})
export class DespesasModule {}
