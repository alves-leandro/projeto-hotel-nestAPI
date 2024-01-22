import { randomUUID } from 'crypto';

export class UserInfo {
  readonly id: string;
  cpf: string;
  contact: string;
  nationality: string;
  emergency_contact: string;
  userId?: string;

  constructor() {
    this.id = randomUUID();
  }
}
