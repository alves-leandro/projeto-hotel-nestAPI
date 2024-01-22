import { randomUUID } from 'crypto';

export class KitchenDish {
  readonly id: string;
  name: string;
  description: string;
  price: number;

  constructor() {
    this.id = randomUUID();
  }
}
