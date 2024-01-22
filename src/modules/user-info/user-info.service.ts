import { Injectable } from '@nestjs/common';

import { UserInfoRepository } from './repositories/userinfo.repository';
import { CreateUserInfoDTO } from './dto/create-userinfo.dto';
import { UpdateUserInfoDto } from './dto/update-userinfo.dto';

@Injectable()
export class UserInfoService {
  constructor(private userInfoRepository: UserInfoRepository) {}

  async create(createUserInfoDto: CreateUserInfoDTO) {
    const userInfo = await this.userInfoRepository.create(createUserInfoDto);
    return userInfo;
  }

  async update(id: string, updateUserInfoDto: UpdateUserInfoDto) {
    const userInfo = await this.userInfoRepository.update(
      id,
      updateUserInfoDto,
    );
    return userInfo;
  }
}
