import { IsUUID } from 'class-validator';

export class CreateReservationDishDto {
  @IsUUID()
  reservationId: string;

  @IsUUID()
  kitchenDishesId: string;
}
