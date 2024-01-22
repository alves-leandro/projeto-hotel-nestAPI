import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { PromotionsRepository } from './repositories/promotions.repository';
import { PromotionsPrismaRepository } from './repositories/prisma/promotions-prisma.repository';

@Module({
  controllers: [PromotionsController],
  providers: [
    PromotionsService,
    PrismaService,
    {
      provide: PromotionsRepository,
      useClass: PromotionsPrismaRepository,
    },
  ],
})
export class PromotionsModule {}
