import { randomUUID } from 'crypto';

export class Supply {
  readonly id: string;
  name: string;
  description: string;
  stock: number;
  price: number;

  constructor() {
    this.id = randomUUID();
  }
}
