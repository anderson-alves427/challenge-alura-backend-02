import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
export class CreateDespesaDto {
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

  @IsString()
  @IsOptional()
  id_categoria:
    | 'Alimentação'
    | 'Sáude'
    | 'Moradia'
    | 'Transporte'
    | 'Educação'
    | 'Lazer'
    | 'Outros';
}
