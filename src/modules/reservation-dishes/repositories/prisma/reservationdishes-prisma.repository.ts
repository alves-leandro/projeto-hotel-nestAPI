import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { plainToInstance } from 'class-transformer';
import { CreateReservationDishDto } from '../../dto/create-reservationdish.dto';
import { ReservationDish } from '../../entities/reservationdish.entity';
import { UpdateReservationDishDto } from '../../dto/update-reservationdish.dto';

@Injectable()
export class ReservationsDishesPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReservationDishDto): Promise<ReservationDish> {
    const reservationDish = new ReservationDish();
    Object.assign(reservationDish, data);

    const newReservationDish = await this.prisma.reservationsDishes.create({
      data: { ...reservationDish },
    });

    return plainToInstance(ReservationDish, newReservationDish);
  }

  async findAll(): Promise<ReservationDish[]> {
    const reservationsDishes = await this.prisma.reservationsDishes.findMany();
    return plainToInstance(ReservationDish, reservationsDishes);
  }

  async findOne(id: string): Promise<ReservationDish> {
    const reservationDish = await this.prisma.reservationsDishes.findUnique({
      where: { id },
    });
    return plainToInstance(ReservationDish, reservationDish);
  }

  async update(
    id: string,
    data: UpdateReservationDishDto,
  ): Promise<ReservationDish> {
    const reservationDish = await this.prisma.reservationsDishes.update({
      where: { id },
      data,
    });
    return plainToInstance(ReservationDish, reservationDish);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.reservationsDishes.delete({
      where: { id },
    });
  }
}
