import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservationsDishesRepository } from './repositories/reservationdishes.repository';
import { CreateReservationDishDto } from './dto/create-reservationdish.dto';
import { UpdateReservationDishDto } from './dto/update-reservationdish.dto';

@Injectable()
export class ReservationsDishesService {
  constructor(
    private reservationsDishesRepository: ReservationsDishesRepository,
  ) {}

  async create(createReservationDishDto: CreateReservationDishDto) {
    return this.reservationsDishesRepository.create(createReservationDishDto);
  }

  async findAll() {
    return this.reservationsDishesRepository.findAll();
  }

  async findOne(id: string) {
    const reservationDish = await this.reservationsDishesRepository.findOne(id);
    if (!reservationDish) {
      throw new NotFoundException(`Reservation Dish with ID ${id} not found`);
    }
    return reservationDish;
  }

  async update(
    id: string,
    updateReservationsDishDto: UpdateReservationDishDto,
  ) {
    const reservationDish = await this.reservationsDishesRepository.update(
      id,
      updateReservationsDishDto,
    );
    if (!reservationDish) {
      throw new NotFoundException(`Reservation Dish with ID ${id} not found`);
    }
    return reservationDish;
  }

  async remove(id: string) {
    const reservationDish = await this.reservationsDishesRepository.findOne(id);
    if (!reservationDish) {
      throw new NotFoundException(`Reservation Dish with ID ${id} not found`);
    }
    await this.reservationsDishesRepository.delete(id);
  }
}
