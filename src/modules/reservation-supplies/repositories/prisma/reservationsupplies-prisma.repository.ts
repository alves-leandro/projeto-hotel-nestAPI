import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { plainToInstance } from 'class-transformer';
import { CreateReservationSupplyDto } from '../../dto/create-reservationsupply.dto';
import { ReservationSupply } from '../../entities/reservationsupply.entity';
import { UpdateReservationSupplyDto } from '../../dto/update-reservationsupply.dto';

@Injectable()
export class ReservationsSuppliesPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReservationSupplyDto): Promise<ReservationSupply> {
    const reservationSupply = new ReservationSupply();
    Object.assign(reservationSupply, data);

    const newReservationSupply = await this.prisma.reservationSupplies.create({
      data: { ...reservationSupply },
    });

    return plainToInstance(ReservationSupply, newReservationSupply);
  }

  async findAll(): Promise<ReservationSupply[]> {
    const reservationsSupplies =
      await this.prisma.reservationSupplies.findMany();
    return plainToInstance(ReservationSupply, reservationsSupplies);
  }

  async findOne(id: string): Promise<ReservationSupply> {
    const reservationSupply = await this.prisma.reservationSupplies.findUnique({
      where: { id },
    });
    return plainToInstance(ReservationSupply, reservationSupply);
  }

  async update(
    id: string,
    data: UpdateReservationSupplyDto,
  ): Promise<ReservationSupply> {
    const reservationSupply = await this.prisma.reservationSupplies.update({
      where: { id },
      data,
    });
    return plainToInstance(ReservationSupply, reservationSupply);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.reservationSupplies.delete({
      where: { id },
    });
  }
}
