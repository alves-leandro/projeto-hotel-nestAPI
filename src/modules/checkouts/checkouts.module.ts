import { Module } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { CheckoutsRepository } from './repositories/checkouts.repository';
import { CheckoutsPrismaRepository } from './repositories/prisma/checkouts-prisma.repository';

@Module({
  controllers: [CheckoutsController],
  providers: [
    CheckoutsService,
    PrismaService,
    {
      provide: CheckoutsRepository,
      useClass: CheckoutsPrismaRepository,
    },
  ],
})
export class CheckoutsModule {}
