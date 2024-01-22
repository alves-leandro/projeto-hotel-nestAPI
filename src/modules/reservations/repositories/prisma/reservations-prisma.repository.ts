import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { CreateReservationDto } from '../../dto/create-reservation.dto';
import { UpdateReservationDto } from '../../dto/update-reservation.dto';
import { Reservation } from '../../entities/reservation.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ReservationsPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReservationDto): Promise<Reservation> {
    const room = await this.prisma.room.findUnique({
      where: { id: data.roomId },
    });

    if (!room || room.status === 'UNDER_MAINTENANCE') {
      throw new BadRequestException('Room not available for reservation.');
    }

    const baseRoomValue = room.value || 0;
    const defaultAdults = 2;
    const occupancyAdults = room.capacityAdults || 2;
    const occupancyChildren = room.capacityChildren || 0;
    const additionalPersonCost = 70;

    let totalValue = baseRoomValue;

    if (data.promotionId) {
      const promotion = await this.prisma.promotion.findUnique({
        where: { id: data.promotionId },
      });

      if (promotion) {
        const reservationStartDate = new Date(data.initialDate);
        const reservationEndDate = new Date(data.endDate);

        if (
          reservationStartDate < new Date(promotion.initialDate) ||
          reservationEndDate > new Date(promotion.endDate)
        ) {
          throw new BadRequestException(
            'A reserva não está dentro do prazo da promoção.',
          );
        }

        totalValue -= Math.max(promotion.value || 0, 0);
      } else {
        throw new NotFoundException('Promoção não encontrada');
      }
    }

    totalValue +=
      Math.max(data.adults - occupancyAdults, 0) * additionalPersonCost +
      Math.max(data.children - occupancyChildren, 0) * additionalPersonCost;

    if (data.adults > defaultAdults) {
      const additionalAdults = data.adults - defaultAdults;
      totalValue += additionalAdults * additionalPersonCost;
    }

    const reservationStartDate: Date = new Date(data.initialDate);
    const reservationEndDate: Date = new Date(data.endDate);
    const numberOfDays: number = Math.ceil(
      (reservationEndDate.getTime() - reservationStartDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (numberOfDays > 1) {
      totalValue *= numberOfDays;
    }

    const existingReservations = await this.prisma.reservation.findMany({
      where: {
        roomId: data.roomId,
        OR: [
          {
            AND: [
              {
                initialDate: {
                  lte: new Date(data.endDate),
                },
              },
              {
                endDate: {
                  gte: new Date(data.initialDate),
                },
              },
            ],
          },
          {
            AND: [
              {
                initialDate: {
                  lte: new Date(data.endDate),
                },
              },
              {
                endDate: {
                  gte: new Date(data.initialDate),
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

    if (existingReservations.some(reservation => {
      const reservationStartDate = new Date(reservation.initialDate);
      const reservationEndDate = new Date(reservation.endDate);
    
      // Verifica se a nova reserva termina antes do início da reserva existente
      if (new Date(data.endDate) < reservationStartDate) {
        return false; // Não há sobreposição, a nova reserva pode ser feita
      }
    
      // Verifica se a nova reserva inicia durante o período de uma reserva existente
      if (new Date(data.initialDate) >= reservationStartDate && new Date(data.initialDate) < reservationEndDate) {
        return true;
      }
    
      // Verifica se a nova reserva termina durante o período de uma reserva existente
      if (new Date(data.endDate) > reservationStartDate && new Date(data.endDate) <= reservationEndDate) {
        return true;
      }
    
      // Verifica se a nova reserva envolve completamente o período de uma reserva existente
      if (new Date(data.initialDate) <= reservationStartDate && new Date(data.endDate) >= reservationEndDate) {
        return true;
      }
    
      return false;
    })) {
      throw new BadRequestException('A reservation already exists for the selected dates.');
    }
    

    const reservation = new Reservation();
    Object.assign(reservation, data);

    const sanitizedTotalValue = isFinite(totalValue) ? totalValue : 0;

    const newReservation = await this.prisma.reservation.create({
      data: {
        ...reservation,
        totalValue: sanitizedTotalValue,
      },
      include: {
        Promotion: true,
      },
    });

    return plainToInstance(Reservation, newReservation);
  }

  private groupby(reservation: Reservation[], key: string) {
    return reservation.reduce((acc, cur) => {
      (acc[cur[key]] = acc[cur[key]] || []).push(cur);
      return acc;
    }, {});
  }

  async findAll(group: string | undefined): Promise<Reservation[] | object> {
    const reservations = await this.prisma.reservation.findMany({
      include: {
        User: {
          select: {
            name: true,
            userInfo: {
              select: {
                cpf: true,
                nationality: true,
                contact: true,
                emergency_contact: true,
              },
            },
          },
        },
        Room: {
          select: {
            number: true,
            type: true,
            status: true,
          },
        },
        Promotion: {
          select: { value: true },
        },
      },
    });
    if (group) {
      return this.groupby(reservations, group);
    }
    return plainToInstance(Reservation, reservations);
  }

  async findOne(id: string): Promise<Reservation | null> {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        User: {
          select: {
            name: true,
            userInfo: {
              select: {
                cpf: true,
                nationality: true,
                contact: true,
                emergency_contact: true,
              },
            },
          },
        },
        Room: {
          select: {
            number: true,
            type: true,
            status: true,
          },
        },
        Promotion: {
          select: { value: true },
        },
      },
    });
    return reservation;
  }

  async update(
    id: string,
    data: UpdateReservationDto,
  ): Promise<Reservation | null> {
    const reservation = await this.prisma.reservation.update({
      where: { id },
      data: { ...data },
    });
    return reservation;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.reservation.delete({
      where: { id },
    });
  }
}
