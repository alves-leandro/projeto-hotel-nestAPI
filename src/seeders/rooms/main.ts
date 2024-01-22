import { PrismaClient } from '@prisma/client';
import * as Chance from 'chance';
import { randomUUID } from 'crypto';

const chance = new Chance();

const possibleRoomTypes = ['STANDARD', 'EXECUTIVE', 'DELUXE'];
const possibleRoomStatus = ['AVAILABLE', 'OCCUPIED', 'UNDER_MAINTENANCE'];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (let i = 0; i < 10; i++) {
      const room = await prisma.room.create({
        data: {
          id: randomUUID(),
          number: chance.integer({ min: 100, max: 999 }),
          type: chance.pickone(possibleRoomTypes),
          status: chance.pickone(possibleRoomStatus),
          capacityAdults: chance.integer({ min: 1, max: 4 }),
          capacityChildren: chance.integer({ min: 0, max: 2 }),
          value: chance.floating({ min: 50, max: 300 }),
        },
      });
      console.log('Created room:', room);
    }

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
