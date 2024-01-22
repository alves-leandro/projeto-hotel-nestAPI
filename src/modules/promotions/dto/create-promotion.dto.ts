import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  details: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsNotEmpty()
  value: number;

  @Type(() => Date)
  @IsNotEmpty()
  initialDate: Date;

  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;
}
