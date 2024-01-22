import { Module } from '@nestjs/common';
import { SuppliesController } from './supplies.controller';
import { SuppliesService } from './supplies.service';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { SuppliesRepository } from './repositories/supplies.repository';
import { SuppliesPrismaRepository } from './repositories/prisma/supplies-prisma.repository';

@Module({
  controllers: [SuppliesController],
  providers: [
    SuppliesService,
    PrismaService,
    {
      provide: SuppliesRepository,
      useClass: SuppliesPrismaRepository,
    },
  ],
})
export class SuppliesModule {}
