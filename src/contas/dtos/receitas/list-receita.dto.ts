import { IsOptional, IsString } from 'class-validator';

export class ListReceitaDTO {
  @IsOptional()
  @IsString()
  descricao?: string;
}
