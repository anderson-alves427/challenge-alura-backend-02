import { Module } from '@nestjs/common';
import { ReceitasModule } from './receitas/receitas.module';

@Module({
  imports: [ReceitasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
