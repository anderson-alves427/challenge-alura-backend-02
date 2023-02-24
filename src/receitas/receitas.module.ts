import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReceitasController } from './receitas.controller';
import { ReceitasService } from './receitas.service';
import { ReceitaEntity } from './entity/receita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceitaEntity])],
  controllers: [ReceitasController],
  providers: [ReceitasService],
})
export class ReceitasModule {}
