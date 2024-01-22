import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { KitchenDishesController } from './kitchendishes.controller';
import { KitchenDishesService } from './kitchendishes.service';
import { KitchenDishesRepository } from './repositories/kitchendishes.repository';
import { KitchenDishesPrismaRepository } from './repositories/prisma/kitchendishes-prisma.repository';

@Module({
  controllers: [KitchenDishesController],
  providers: [
    KitchenDishesService,
    PrismaService,
    {
      provide: KitchenDishesRepository,
      useClass: KitchenDishesPrismaRepository,
    },
  ],
})
export class KitchenDishesModule {}
