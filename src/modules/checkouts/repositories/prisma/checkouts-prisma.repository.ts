import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { CreateCheckoutDto } from '../../dto/create-checkout.dto';
import { UpdateCheckoutDto } from '../../dto/update-checkout.dto';
import { Checkout } from '../../entities/checkout.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CheckoutsPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCheckoutDto): Promise<Checkout> {
    const checkout = new Checkout();
    Object.assign(checkout, {
      ...data,
    });

    const newCheckout = await this.prisma.checkout.create({
      data: { ...checkout },
    });

    return plainToInstance(Checkout, newCheckout);
  }

  async findAll(): Promise<Checkout[]> {
    const checkouts = await this.prisma.checkout.findMany({
      include: {
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
        Reservation: {
          select: {
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
    return plainToInstance(Checkout, checkouts);
  }

  async findOne(id: string): Promise<Checkout | null> {
    const checkout = await this.prisma.checkout.findUnique({
      where: { id },
      include: {
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
        Reservation: {
          select: {
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
    return plainToInstance(Checkout, checkout);
  }

  async update(id: string, data: UpdateCheckoutDto): Promise<Checkout | null> {
    const checkout = await this.prisma.checkout.update({
      where: { id },
      data,
    });
    return plainToInstance(Checkout, checkout);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.checkout.delete({
      where: { id },
    });
  }
}
