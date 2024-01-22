import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { Reservation } from '../entities/reservation.entity';

export abstract class ReservationsRepository {
  abstract create(
    data: CreateReservationDto,
  ): Promise<Reservation> | Reservation;
  abstract findAll(group: string | undefined): Promise<Reservation[]> | object;
  abstract findOne(id: string): Promise<Reservation> | Reservation;
  abstract update(
    id: string,
    data: UpdateReservationDto,
  ): Promise<Reservation> | Reservation;
  abstract delete(id: string): Promise<void> | void;
}
