import { randomUUID } from 'crypto';

export class ReservationDish {
  readonly id: string;
  reservationId: string;
  kitchenDishesId: string;

  constructor() {
    this.id = randomUUID();
  }
}
