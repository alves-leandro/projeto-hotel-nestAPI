import { Type } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';

export class CreateCheckinDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  reservationId: string;

  @Type(() => Date)
  @IsDate()
  checkin_date: Date;
}
