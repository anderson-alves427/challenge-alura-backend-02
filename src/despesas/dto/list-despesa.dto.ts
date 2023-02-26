import { IsString, IsOptional } from 'class-validator';
export class ListDespesaDTO {
  @IsString()
  @IsOptional()
  descricao: string;
}
