import { UserRule } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  username: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  rule: UserRule;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
    this.deletedAt = null;
  }
}
