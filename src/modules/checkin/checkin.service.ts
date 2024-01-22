import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { UpdateCheckinDto } from './dto/update-checkin.dto';
import { CheckinRepository } from './repositories/checkin.repository';

@Injectable()
export class CheckinService {
  constructor(private checkinRepository: CheckinRepository) {}

  async create(createCheckinDto: CreateCheckinDto) {
    return this.checkinRepository.create(createCheckinDto);
  }

  async findAll() {
    return this.checkinRepository.findAll();
  }

  async findOne(id: string) {
    const checkin = await this.checkinRepository.findOne(id);
    if (!checkin) {
      throw new NotFoundException(`Checkin with ID ${id} not found`);
    }
    return checkin;
  }

  async update(id: string, updateCheckinDto: UpdateCheckinDto) {
    return this.checkinRepository.update(id, updateCheckinDto);
  }

  async remove(id: string) {
    const checkin = await this.checkinRepository.findOne(id);
    if (!checkin) {
      throw new NotFoundException(`Checkin with ID ${id} not found`);
    }
    await this.checkinRepository.delete(id);
  }
}
