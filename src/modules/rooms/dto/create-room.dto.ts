import { StatusRoom, TypeRoom } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsEnum(StatusRoom, { each: true })
  @IsNotEmpty()
  status: StatusRoom;

  @IsEnum(TypeRoom, { each: true })
  @IsNotEmpty()
  type: TypeRoom;

  @IsNumber()
  @Min(1, { message: 'A reserva deve ter pelo menos 1 adulto.' })
  @Max(3, { message: 'A reserva não pode ter mais de 3 adultos.' })
  capacityAdults: number;

  @IsNumber()
  @Min(0, { message: 'A reserva não pode ter crianças negativas.' })
  @Max(2, { message: 'A reserva não pode ter mais de 2 crianças.' })
  capacityChildren: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl?: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
