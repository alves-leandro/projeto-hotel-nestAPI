import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInfoDTO } from './create-userinfo.dto';

export class UpdateUserInfoDto extends PartialType(CreateUserInfoDTO) {}
