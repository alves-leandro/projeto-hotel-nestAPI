import { CreateUserInfoDTO } from '../dto/create-userinfo.dto';
import { UpdateUserInfoDto } from '../dto/update-userinfo.dto';
import { UserInfo } from '../entities/userinfo.entitie';

export abstract class UserInfoRepository {
  abstract create(data: CreateUserInfoDTO): Promise<UserInfo> | UserInfo;
  abstract update(
    id: string,
    data: UpdateUserInfoDto,
  ): Promise<UserInfo> | UserInfo;
}
