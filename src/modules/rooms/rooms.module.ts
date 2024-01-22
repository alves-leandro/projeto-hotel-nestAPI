import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { RoomsRepository } from './repositories/rooms.repository';
import { RoomsPrismaRepository } from './repositories/prisma/rooms-prisma.repository';

@Module({
  controllers: [RoomsController],
  providers: [
    RoomsService,
    PrismaService,
    {
      provide: RoomsRepository,
      useClass: RoomsPrismaRepository,
    },
  ],
})
export class RoomsModule {}
