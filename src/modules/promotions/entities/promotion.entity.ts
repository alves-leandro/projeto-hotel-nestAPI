import { randomUUID } from 'crypto';

export class Promotion {
  readonly id: string;
  name: string;
  details: string | null;
  value: number;
  initialDate: Date;
  endDate: Date;

  constructor() {
    this.id = randomUUID();
  }
}
