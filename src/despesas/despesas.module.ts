import {
  TypeOrmModule,
  getRepositoryToken,
  getDataSourceToken,
} from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { DespesasController } from './despesas.controller';
import { DespesaEntity } from './entities/despesa.entity';
import { DataSource } from 'typeorm';
import { customDespesaRepositoryMethods } from './despesa.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DespesaEntity])],
  controllers: [DespesasController],
  providers: [
    DespesasService,
    // DepesasValidacoes,
    {
      provide: getRepositoryToken(DespesaEntity),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(DespesaEntity)
          .extend(customDespesaRepositoryMethods);
      },
    },
  ],
})
export class DespesasModule {}
