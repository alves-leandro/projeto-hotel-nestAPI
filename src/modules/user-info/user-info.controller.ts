import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDTO } from './dto/create-userinfo.dto';
import { UpdateUserInfoDto } from './dto/update-userinfo.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserInfoDTO: CreateUserInfoDTO) {
    return this.userInfoService.create(createUserInfoDTO);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ) {
    return this.userInfoService.update(id, updateUserInfoDto);
  }
}
