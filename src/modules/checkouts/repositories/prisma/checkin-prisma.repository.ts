import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { plainToInstance } from 'class-transformer';
import { CreateCheckinDto } from 'src/modules/checkin/dto/create-checkin.dto';
import { UpdateCheckinDto } from 'src/modules/checkin/dto/update-checkin.dto';
import { Checkin } from 'src/modules/checkin/entities/checkin.entity';

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
    const checkins = await this.prisma.checkin.findMany({
      include: {
        User: {
          select: {
            name: true,
            userInfo: {
              select: {
                cpf: true,
                nationality: true,
              },
            },
          },
        },
        Reservation: {
          select: {
            Promotion: {
              select: {
                value: true,
              },
            },
            Room: {
              select: {
                number: true,
                type: true,
              },
            },
          },
        },
      },
    });
    return plainToInstance(Checkin, checkins);
  }

  async findOne(id: string): Promise<Checkin> {
    const checkin = await this.prisma.checkin.findUnique({
      where: { id },
      include: {
        User: {
          select: {
            name: true,
            userInfo: {
              select: {
                cpf: true,
                nationality: true,
              },
            },
          },
        },
        Reservation: {
          select: {
            Promotion: {
              select: {
                value: true,
              },
            },
            Room: {
              select: {
                number: true,
                type: true,
              },
            },
          },
        },
      },
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
