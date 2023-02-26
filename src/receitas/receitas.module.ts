import { customReceitaRepositoryMethods } from './receita.repository';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReceitasController } from './receitas.controller';
import { ReceitasService } from './receitas.service';
import { Receita } from './entities/receita.entity';
import { DataSource } from 'typeorm';
import { ReceitasValidacoes } from './validacoes/receitas-validacoes';

@Module({
  imports: [TypeOrmModule.forFeature([Receita])],
  controllers: [ReceitasController],
  providers: [
    ReceitasService,
    ReceitasValidacoes,
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
export class ReceitasModule {}
