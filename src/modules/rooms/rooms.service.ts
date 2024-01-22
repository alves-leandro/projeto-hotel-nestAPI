import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsRepository } from './repositories/rooms.repository';
import { CreateReservationDto } from '../reservations/dto/create-reservation.dto';

@Injectable()
export class RoomsService {
  constructor(private roomsRepository: RoomsRepository) {}

  async create(createRoomDto: CreateRoomDto) {
    const findRoom = await this.roomsRepository.findOne(
      createRoomDto.number.toString(),
    );
    if (findRoom) {
      throw new ConflictException('Room already exists');
    }

    const room = await this.roomsRepository.create(createRoomDto);
    return room;
  }

  async findAllRoomsAvailable(
    data: CreateReservationDto,
    adults: number,
    children: number,
  ) {
    return this.roomsRepository.findAllRoomsAvailable(data, adults, children);
  }

  async findAll(group: string | undefined) {
    const rooms = await this.roomsRepository.findAll(group);
    return rooms;
  }

  async findOne(id: string) {
    const room = await this.roomsRepository.findOne(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomsRepository.update(id, updateRoomDto);
    return room;
  }

  async remove(id: string) {
    await this.roomsRepository.delete(id);
  }
}
