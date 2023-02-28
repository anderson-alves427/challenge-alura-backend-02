import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Receita } from './contas/entities/receita.entity';
import { Despesa } from './contas/entities/despesa.entity';
import { ContasModule } from './contas/contas.module';

@Module({
  imports: [
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
    ContasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
