import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { plainToInstance } from 'class-transformer';
import { CreateCheckinDto } from '../../dto/create-checkin.dto';
import { UpdateCheckinDto } from '../../dto/update-checkin.dto';
import { Checkin } from '../../entities/checkin.entity';

@Injectable()
export class CheckinPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCheckinDto): Promise<Checkin> {
    const checkin = new Checkin();
    Object.assign(checkin, {
      ...data,
    });

    checkin.checkin_date = new Date(data.checkin_date);

    const newCheckin = await this.prisma.checkin.create({
      data: { ...checkin },
    });

    return plainToInstance(Checkin, newCheckin);
  }

  async findAll(): Promise<Checkin[]> {
    const checkins = await this.prisma.checkin.findMany();
    return plainToInstance(Checkin, checkins);
  }

  async findOne(id: string): Promise<Checkin> {
    const checkin = await this.prisma.checkin.findUnique({
      where: { id },
    });
    return plainToInstance(Checkin, checkin);
  }

  async update(id: string, data: UpdateCheckinDto): Promise<Checkin> {
    const checkin = await this.prisma.checkin.update({
      where: { id },
      data,
    });
    return plainToInstance(Checkin, checkin);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.checkin.delete({
      where: { id },
    });
  }
}
