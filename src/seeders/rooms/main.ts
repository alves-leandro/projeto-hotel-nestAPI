import { PrismaClient } from '@prisma/client';
import * as Chance from 'chance';
import { randomUUID } from 'crypto';

const chance = new Chance();

const possibleRoomTypes = ['STANDARD', 'EXECUTIVE', 'DELUXE'];
const possibleRoomStatus = ['AVAILABLE', 'OCCUPIED', 'UNDER_MAINTENANCE'];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (let i = 0; i < 3; i++) {
      const room = await prisma.room.create({
        data: {
          id: randomUUID(),
          number: chance.integer({ min: 100, max: 999 }),
          type: chance.pickone(possibleRoomTypes),
          status: chance.pickone(possibleRoomStatus),
          capacityAdults: chance.integer({ min: 1, max: 2 }),
          capacityChildren: chance.integer({ min: 0, max: 2 }),
          imageUrl:
            'https://imgs.search.brave.com/ZMewdLevnjy66QR0i_LdJfeUjP5xxxJQC_EweyFDKHk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/MzQ5ODk0MC9wdC9m/b3RvL2ludGVyaW9y/LW9mLWEtbW9kZXJu/LWx1eHVyeS1ob3Rl/bC1kb3VibGUtYmVk/LWJlZHJvb20uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUhV/Qmd2OXNyTGs4bi0t/VWVTa0FCOGNhNHI5/R0RrSTFmLUx3U0lD/WkRSZTA9',
          value:
            Math.round(chance.floating({ min: 150, max: 300 }) * 100) / 100,
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
