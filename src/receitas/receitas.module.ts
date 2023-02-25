import { customReceitaRepositoryMethods } from './receita.repository';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReceitasController } from './receitas.controller';
import { ReceitasService } from './receitas.service';
import { ReceitaEntity } from './entities/receita.entity';
import { DataSource } from 'typeorm';
import { ReceitasValidacoes } from './validacoes/receitas-validacoes';

@Module({
  imports: [TypeOrmModule.forFeature([ReceitaEntity])],
  controllers: [ReceitasController],
  providers: [
    ReceitasService,
    ReceitasValidacoes,
    {
      provide: getRepositoryToken(ReceitaEntity),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(ReceitaEntity)
          .extend(customReceitaRepositoryMethods);
      },
    },
  ],
})
export class ReceitasModule {}
