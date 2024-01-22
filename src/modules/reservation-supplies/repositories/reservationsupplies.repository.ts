import { CreateReservationSupplyDto } from '../dto/create-reservationsupply.dto';
import { UpdateReservationSupplyDto } from '../dto/update-reservationsupply.dto';
import { ReservationSupply } from '../entities/reservationsupply.entity';

export abstract class ReservationsSuppliesRepository {
  abstract create(
    data: CreateReservationSupplyDto,
  ): Promise<ReservationSupply> | ReservationSupply;
  abstract findAll(): Promise<ReservationSupply[]> | object;
  abstract findOne(id: string): Promise<ReservationSupply> | ReservationSupply;
  abstract update(
    id: string,
    data: UpdateReservationSupplyDto,
  ): Promise<ReservationSupply> | ReservationSupply;
  abstract delete(id: string): Promise<void> | void;
}
