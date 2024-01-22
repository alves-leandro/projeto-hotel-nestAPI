import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  @IsString()
  userId: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  roomId: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  promotionId: string;

  @Type(() => Date)
  @IsNotEmpty()
  initialDate: Date;

  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @IsNumber()
  @IsOptional()
  @Min(1, { message: 'A reserva deve ter pelo menos 1 adulto.' })
  @Max(3, { message: 'A reserva não pode ter mais de 3 adultos.' })
  adults: number = 1;

  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'A reserva não pode ter crianças negativas.' })
  @Max(2, { message: 'A reserva não pode ter mais de 2 crianças.' })
  children: number;

  @IsNumber()
  @IsOptional()
  totalValue: number;
}
