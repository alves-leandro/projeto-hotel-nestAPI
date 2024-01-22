import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateCheckoutDto {
  @Type(() => Date)
  @IsDate()
  checkout_date: Date;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  reservationId?: string;
}
