import { CreateReservationDishDto } from '../dto/create-reservationdish.dto';
import { UpdateReservationDishDto } from '../dto/update-reservationdish.dto';
import { ReservationDish } from '../entities/reservationdish.entity';

export abstract class ReservationsDishesRepository {
  abstract create(
    data: CreateReservationDishDto,
  ): Promise<ReservationDish> | ReservationDish;
  abstract findAll(): Promise<ReservationDish[]> | object;
  abstract findOne(id: string): Promise<ReservationDish> | ReservationDish;
  abstract update(
    id: string,
    data: UpdateReservationDishDto,
  ): Promise<ReservationDish> | ReservationDish;
  abstract delete(id: string): Promise<void> | void;
}
