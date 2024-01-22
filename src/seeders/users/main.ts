import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import * as Chance from 'chance';
import { randomUUID } from 'crypto';

const chance = new Chance();

const possibleRules = ['CLEANER', 'RECEPTIONIST', 'KITCHEN', 'GUEST'];

async function seed() {
  const passwordHash = await hash('123456seed', 10);

  const prisma = new PrismaClient();

  try {
    for (let i = 0; i < 15; i++) {
      const name = chance.name();
      const username = name.toLowerCase().replace(/\s/g, '');
      await prisma.user.create({
        data: {
          id: randomUUID(),
          name: name,
          username: username,
          email: chance.email(),
          rule: chance.pickone(possibleRules),
          password: passwordHash,
        },
      });
    }

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
