import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { UserInfoRepository } from './repositories/userinfo.repository';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { UserInfoPrismaRepository } from './repositories/prisma/userinfo-prisma.repository';

@Module({
  controllers: [UserInfoController],
  providers: [
    UserInfoService,
    PrismaService,
    {
      provide: UserInfoRepository,
      useClass: UserInfoPrismaRepository,
    },
  ],
})
export class UserInfoModule {}
