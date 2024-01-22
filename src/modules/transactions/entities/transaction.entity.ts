import { randomUUID } from 'crypto';

export class Transaction {
  readonly id: string;
  reservationId: string;
  reservationsDate: Date;
  price: number;

  constructor() {
    this.id = randomUUID();
  }
}
