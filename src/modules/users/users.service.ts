import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findInactiveUsers() {
    const inactiveUsers = await this.usersRepository.findInactives();
    return inactiveUsers;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const findUser = await this.usersRepository.findByEmail(email);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.delete(id);
  }

  async restore(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.restore(id);
  }
}
