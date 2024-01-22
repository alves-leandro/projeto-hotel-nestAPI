import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './repositories/reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(private reservationsRepository: ReservationsRepository) {}

  async create(createReservationDto: CreateReservationDto) {
    const room = await this.reservationsRepository.create(createReservationDto);
    return room;
  }

  async findAll(group: string | undefined) {
    const reservation = await this.reservationsRepository.findAll(group);
    return reservation;
  }

  async findOne(id: string) {
    const reservation = await this.reservationsRepository.findOne(id);
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationsRepository.update(
      id,
      updateReservationDto,
    );
    return reservation;
  }

  async remove(id: string) {
    await this.reservationsRepository.delete(id);
  }
}
