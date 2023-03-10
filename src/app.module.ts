import { Despesa } from './despesas/entities/despesa.entity';
import { Receita } from './receitas/entities/receita.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReceitasModule } from './receitas/receitas.module';
import { DespesasModule } from './despesas/despesas.module';

@Module({
  imports: [
    ReceitasModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'challenge_02_alura_backend',
      entities: [Receita, Despesa],
      synchronize: false,
    }),
    DespesasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
