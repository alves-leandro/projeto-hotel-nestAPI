import { IsUUID } from 'class-validator';

export class CreateReservationSupplyDto {
  @IsUUID()
  reservationId: string;

  @IsUUID()
  supplyId: string;
}
