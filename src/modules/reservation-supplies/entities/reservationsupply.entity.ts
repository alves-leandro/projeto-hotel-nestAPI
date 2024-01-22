import { randomUUID } from 'crypto';

export class ReservationSupply {
  readonly id: string;
  reservationId: string;
  supplyId: string;

  constructor() {
    this.id = randomUUID();
  }
}
