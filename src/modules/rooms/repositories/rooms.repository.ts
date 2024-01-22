import { CreateReservationDto } from 'src/modules/reservations/dto/create-reservation.dto';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { Room } from '../entities/room.entity';

export abstract class RoomsRepository {
  abstract create(data: CreateRoomDto): Promise<Room> | Room;
  abstract findAllRoomsAvailable(
    data: CreateReservationDto,
    adults: number,
    children: number,
  ): Promise<Room[]> | object;
  abstract findAll(group: string | undefined): Promise<Room[]> | object;
  abstract findOne(id: string): Promise<Room> | Room;
  abstract update(id: string, data: UpdateRoomDto): Promise<Room> | Room;
  abstract delete(id: string): Promise<void> | void;
}
