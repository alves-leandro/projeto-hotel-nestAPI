import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { ReservationsDishesController } from './reservationdishes.controller';
import { ReservationsDishesService } from './reservationdishes.service';
import { ReservationsDishesRepository } from './repositories/reservationdishes.repository';
import { ReservationsDishesPrismaRepository } from './repositories/prisma/reservationdishes-prisma.repository';

@Module({
  controllers: [ReservationsDishesController],
  providers: [
    ReservationsDishesService,
    PrismaService,
    {
      provide: ReservationsDishesRepository,
      useClass: ReservationsDishesPrismaRepository,
    },
  ],
  exports: [ReservationsDishesService],
})
export class ReservationsDishesModule {}
