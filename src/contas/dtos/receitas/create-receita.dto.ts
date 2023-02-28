import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateReceitaDTO {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  data: Date;
}
