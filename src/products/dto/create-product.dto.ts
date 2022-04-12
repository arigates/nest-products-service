import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public buyPrice: number;

  @IsNumber()
  @IsNotEmpty()
  public sellPrice: number;
}
