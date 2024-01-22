import { StatusRoom, TypeRoom } from '@prisma/client';
import { randomUUID } from 'crypto';

export class Room {
  readonly id: string;
  number: number;
  status: StatusRoom;
  type: TypeRoom;
  capacityAdults: number;
  capacityChildren: number;
  imageUrl?: string;
  value: number;

  constructor() {
    this.id = randomUUID();
  }
}
