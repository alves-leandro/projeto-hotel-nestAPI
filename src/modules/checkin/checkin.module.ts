import { Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { CheckinRepository } from './repositories/checkin.repository';
import { CheckinPrismaRepository } from './repositories/prisma/checkin-prisma.repository';

@Module({
  controllers: [CheckinController],
  providers: [
    CheckinService,
    PrismaService,
    {
      provide: CheckinRepository,
      useClass: CheckinPrismaRepository,
    },
  ],
})
export class CheckinModule {}
