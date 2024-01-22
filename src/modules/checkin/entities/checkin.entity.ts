import { randomUUID } from 'crypto';

export class Checkin {
  readonly id: string;
  userId: string;
  reservationId: string;
  checkin_date: Date;

  constructor() {
    this.id = randomUUID();
  }
}
