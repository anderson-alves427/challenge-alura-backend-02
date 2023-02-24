import { ReceitaEntity } from './receitas/entity/receita.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReceitasModule } from './receitas/receitas.module';

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
      entities: [ReceitaEntity],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
