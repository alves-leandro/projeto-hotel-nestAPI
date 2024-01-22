import { randomUUID } from 'crypto';

export class Reservation {
  readonly id: string;
  userId: string;
  roomId: string | null;
  promotionId: string | null;
  initialDate: Date;
  endDate: Date;
  adults?: number;
  children?: number;
  totalValue?: number;

  constructor() {
    this.id = randomUUID();
  }
}
