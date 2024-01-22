import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservationsSuppliesRepository } from './repositories/reservationsupplies.repository';
import { CreateReservationSupplyDto } from './dto/create-reservationsupply.dto';
import { UpdateReservationSupplyDto } from './dto/update-reservationsupply.dto';

@Injectable()
export class ReservationsSuppliesService {
  constructor(
    private reservationsSuppliesRepository: ReservationsSuppliesRepository,
  ) {}

  async create(createReservationSupplyDto: CreateReservationSupplyDto) {
    return this.reservationsSuppliesRepository.create(
      createReservationSupplyDto,
    );
  }

  async findAll() {
    return this.reservationsSuppliesRepository.findAll();
  }

  async findOne(id: string) {
    const reservationSupply =
      await this.reservationsSuppliesRepository.findOne(id);
    if (!reservationSupply) {
      throw new NotFoundException(`Reservaton Supply with ID ${id} not found`);
    }
    return reservationSupply;
  }

  async update(
    id: string,
    updateReservationsSupplyDto: UpdateReservationSupplyDto,
  ) {
    const reservationSupply = await this.reservationsSuppliesRepository.update(
      id,
      updateReservationsSupplyDto,
    );
    if (!reservationSupply) {
      throw new NotFoundException(`Reservaton Supply with ID ${id} not found`);
    }
    return reservationSupply;
  }

  async remove(id: string) {
    const reservationSupply =
      await this.reservationsSuppliesRepository.findOne(id);
    if (!reservationSupply) {
      throw new NotFoundException(`Reservaton Supply with ID ${id} not found`);
    }
    await this.reservationsSuppliesRepository.delete(id);
  }
}
