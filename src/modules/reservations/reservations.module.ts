import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { ReservationsRepository } from './repositories/reservations.repository';
import { ReservationsPrismaRepository } from './repositories/prisma/reservations-prisma.repository';

@Module({
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    PrismaService,
    {
      provide: ReservationsRepository,
      useClass: ReservationsPrismaRepository,
    },
  ],
})
export class ReservationsModule {}
