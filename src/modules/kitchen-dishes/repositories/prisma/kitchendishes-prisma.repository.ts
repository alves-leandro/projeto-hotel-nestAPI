import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { plainToInstance } from 'class-transformer';
import { KitchenDishesRepository } from '../kitchendishes.repository';
import { KitchenDish } from '../../entities/kitchendish.entity';
import { CreateKitchenDishDto } from '../../dto/create-kitchendish.dto';
import { UpdateKitchenDishDto } from '../../dto/update-kitchendish.dto';

@Injectable()
export class KitchenDishesPrismaRepository implements KitchenDishesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateKitchenDishDto): Promise<KitchenDish> {
    const kitchenDish = new KitchenDish();
    Object.assign(kitchenDish, {
      ...data,
    });

    const newKitchenDish = await this.prisma.kitchenDishes.create({
      data: { ...kitchenDish },
    });

    return plainToInstance(KitchenDish, newKitchenDish);
  }

  async findAll(): Promise<KitchenDish[]> {
    const kitchenDishes = await this.prisma.kitchenDishes.findMany();
    return plainToInstance(KitchenDish, kitchenDishes);
  }

  async findOne(id: string): Promise<KitchenDish> {
    const kitchenDish = await this.prisma.kitchenDishes.findUnique({
      where: { id },
    });
    return plainToInstance(KitchenDish, kitchenDish);
  }

  async update(id: string, data: UpdateKitchenDishDto): Promise<KitchenDish> {
    const kitchenDish = await this.prisma.kitchenDishes.update({
      where: { id },
      data,
    });

    return plainToInstance(KitchenDish, kitchenDish);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.kitchenDishes.delete({ where: { id } });
  }
}
