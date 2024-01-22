import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../dto/update-transaction.dto';
import { Transaction } from '../../entities/transaction.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TransactionsPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTransactionDto): Promise<Transaction> {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: data.reservationId },
      include: {
        ReservationSupplies: {
          select: {
            supplyId: true,
          },
        },
        ReservationsDishes: {
          select: {
            kitchenDishesId: true,
          },
        },
      },
    });

    if (!reservation) {
      throw new NotFoundException('Not found reservation!');
    }

    const supplyCountMap = new Map<string, number>();
    reservation.ReservationSupplies.forEach((item) => {
      const count = supplyCountMap.get(item.supplyId) || 0;
      supplyCountMap.set(item.supplyId, count + 1);
    });

    const dishCountMap = new Map<string, number>();
    reservation.ReservationsDishes.forEach((item) => {
      const count = dishCountMap.get(item.kitchenDishesId) || 0;
      dishCountMap.set(item.kitchenDishesId, count + 1);
    });

    const supplyIds = Array.from(supplyCountMap.keys());
    const supplies = await this.prisma.supply.findMany({
      where: {
        id: {
          in: supplyIds,
        },
      },
    });

    const totalSupplyValue = supplies.reduce((total, supply) => {
      const count = supplyCountMap.get(supply.id) || 0;
      return total + supply.price * count;
    }, 0);

    const dishIds = Array.from(dishCountMap.keys());
    const dishes = await this.prisma.kitchenDishes.findMany({
      where: {
        id: {
          in: dishIds,
        },
      },
    });

    const totalDishValue = dishes.reduce((total, dish) => {
      const count = dishCountMap.get(dish.id) || 0;
      return total + dish.price * count;
    }, 0);

    const transaction = new Transaction();
    Object.assign(transaction, {
      ...data,
      price: totalSupplyValue + totalDishValue + reservation.totalValue,
    });

    const newTransaction = await this.prisma.transaction.create({
      data: { ...transaction },
    });

    return plainToInstance(Transaction, newTransaction);
  }

  async findAll(): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        Reservation: {
          select: {
            User: {
              select: {
                name: true,
                userInfo: {
                  select: {
                    cpf: true,
                    nationality: true,
                  },
                },
              },
            },
            Promotion: {
              select: {
                value: true,
              },
            },
            Room: {
              select: {
                number: true,
                type: true,
              },
            },
          },
        },
      },
    });
    return plainToInstance(Transaction, transactions);
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        Reservation: {
          select: {
            User: {
              select: {
                name: true,
                userInfo: {
                  select: {
                    cpf: true,
                    nationality: true,
                  },
                },
              },
            },
            Promotion: {
              select: {
                value: true,
              },
            },
            Room: {
              select: {
                number: true,
                type: true,
              },
            },
            ReservationSupplies: true,
            ReservationsDishes: true,
          },
        },
      },
    });
    return plainToInstance(Transaction, transaction);
  }

  async update(id: string, data: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.prisma.transaction.update({
      where: { id },
      data,
    });
    return plainToInstance(Transaction, transaction);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({ where: { id } });
  }
}
