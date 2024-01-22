import { Injectable } from '@nestjs/common';
import { RoomsRepository } from '../rooms.repository';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { CreateRoomDto } from '../../dto/create-room.dto';
import { UpdateRoomDto } from '../../dto/update-room.dto';
import { Room } from '../../entities/room.entity';
import { plainToInstance } from 'class-transformer';
import { CreateReservationDto } from 'src/modules/reservations/dto/create-reservation.dto';

@Injectable()
export class RoomsPrismaRepository implements RoomsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRoomDto): Promise<Room> {
    const room = new Room();
    Object.assign(room, {
      ...data,
    });

    const newRoom = await this.prisma.room.create({
      data: { ...room },
    });

    return plainToInstance(Room, newRoom);
  }

  private groupby(room: Room[], key: string) {
    return room.reduce((acc, cur) => {
      (acc[cur[key]] = acc[cur[key]] || []).push(cur);
      return acc;
    }, {});
  }

  async findAllRoomsAvailable(
    data: CreateReservationDto,
    adults: number,
    children: number,
  ): Promise<Room[]> {
    // Lógica para encontrar quartos disponíveis
    const rooms = await this.prisma.room.findMany({
      where: {
        status: 'AVAILABLE',
      },
      orderBy: {
        number: 'asc',
      },
    });

    const availableRooms = [];

    for (const room of rooms) {
      // Obter a capacidade do quarto
      const { capacityAdults, capacityChildren } = room;

      // Verificar a capacidade disponível
      const totalPeople = adults + children;

      if (totalPeople <= capacityAdults + capacityChildren) {
        const existingReservations = await this.prisma.reservation.findMany({
          where: {
            roomId: room.id,
            OR: [
              {
                // Verifica se a nova reserva inicia durante uma reserva existente
                AND: [
                  {
                    initialDate: {
                      lt: new Date(data.endDate),
                    },
                  },
                  {
                    endDate: {
                      gt: new Date(data.initialDate),
                    },
                  },
                ],
              },
              {
                // Verifica se a nova reserva antecede uma reserva existente
                AND: [
                  {
                    initialDate: {
                      lte: new Date(data.initialDate),
                    },
                  },
                  {
                    endDate: {
                      gt: new Date(data.initialDate),
                    },
                  },
                ],
              },
              {
                // Verifica se a nova reserva é para o mesmo período de uma reserva existente
                AND: [
                  {
                    initialDate: {
                      gte: new Date(data.initialDate),
                    },
                  },
                  {
                    endDate: {
                      lte: new Date(data.endDate),
                    },
                  },
                ],
              },
            ],
          },
          orderBy: {
            endDate: 'desc',
          },
        });

        if (existingReservations.length === 0) {
          availableRooms.push(room);
        } else {
          console.log(
            `Quarto ${room.id} tem uma reserva existente para as datas selecionadas.`,
          );
        }
      }
    }

    return plainToInstance(Room, availableRooms);
  }

  async findAll(group: string): Promise<Room[] | object> {
    const room = await this.prisma.room.findMany({
      orderBy: {
        number: 'asc',
      },
    });
    if (group) {
      return this.groupby(room, group);
    }
    return plainToInstance(Room, room);
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });
    return plainToInstance(Room, room);
  }

  async update(id: string, data: UpdateRoomDto): Promise<Room> {
    const room = await this.prisma.room.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(Room, room);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.room.delete({
      where: { id },
    });
  }
}
