import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { ReservationsSuppliesController } from './reservationsupplies.controller';
import { ReservationsSuppliesRepository } from './repositories/reservationsupplies.repository';
import { ReservationsSuppliesPrismaRepository } from './repositories/prisma/reservationsupplies-prisma.repository';
import { ReservationsSuppliesService } from './reservationsupplies.service';

@Module({
  controllers: [ReservationsSuppliesController],
  providers: [
    ReservationsSuppliesService,
    PrismaService,
    {
      provide: ReservationsSuppliesRepository,
      useClass: ReservationsSuppliesPrismaRepository,
    },
  ],
  exports: [ReservationsSuppliesService],
})
export class ReservationsSuppliesModule {}
