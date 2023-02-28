import { IsIn, IsNotEmpty, Length, Matches } from 'class-validator';
export class FiltraMesAnoDTO {
  @IsNotEmpty()
  @Length(4, 4)
  @Matches(/^[0-9]{4}$/, {
    message: 'Ano deve estar no formato de 4 dígitos. Exemplo: 1998',
  })
  ano: number;

  @IsNotEmpty()
  @Length(2, 2)
  @IsIn([
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ])
  mes: number;
}
