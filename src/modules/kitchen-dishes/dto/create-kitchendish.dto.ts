import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateKitchenDishDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsNotEmpty()
  price: number;
}
