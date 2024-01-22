import { randomUUID } from 'crypto';

export class Checkout {
  readonly id: string;
  checkout_date: Date;
  userId?: string;
  reservationId?: string;

  constructor() {
    this.id = randomUUID();
  }
}
