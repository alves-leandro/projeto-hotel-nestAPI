import { Injectable } from '@nestjs/common';
import { UserInfoRepository } from '../userinfo.repository';
import { CreateUserInfoDTO } from '../../dto/create-userinfo.dto';
import { UpdateUserInfoDto } from '../../dto/update-userinfo.dto';
import { UserInfo } from '../../entities/userinfo.entitie';
import { PrismaService } from 'src/database/PrismaServiceDatabase';

@Injectable()
export class UserInfoPrismaRepository implements UserInfoRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserInfoDTO): Promise<UserInfo> {
    const userInfo = new UserInfo();

    Object.assign(userInfo, {
      ...data,
    });

    const newUserInfo = await this.prisma.userInfo.create({
      data: {
        id: userInfo.id,
        cpf: userInfo.cpf,
        contact: userInfo.contact,
        nationality: userInfo.nationality,
        emergency_contact: userInfo.emergency_contact,
        userId: userInfo.userId,
      },
    });

    return newUserInfo;
  }

  async update(id: string, data: UpdateUserInfoDto): Promise<UserInfo> {
    const userInfo = await this.prisma.userInfo.update({
      where: { id },
      data: { ...data },
    });
    return userInfo;
  }
}
