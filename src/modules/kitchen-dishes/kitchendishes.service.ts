import { Injectable, NotFoundException } from '@nestjs/common';
import { KitchenDishesRepository } from './repositories/kitchendishes.repository';
import { CreateKitchenDishDto } from './dto/create-kitchendish.dto';
import { UpdateKitchenDishDto } from './dto/update-kitchendish.dto';

@Injectable()
export class KitchenDishesService {
  constructor(private kitchenDishesRepository: KitchenDishesRepository) {}

  async create(createKitchenDishDto: CreateKitchenDishDto) {
    const kitchenDish =
      await this.kitchenDishesRepository.create(createKitchenDishDto);
    return kitchenDish;
  }

  async findAll() {
    const kitchenDishes = await this.kitchenDishesRepository.findAll();
    return kitchenDishes;
  }

  async findOne(id: string) {
    const kitchenDish = await this.kitchenDishesRepository.findOne(id);
    if (!kitchenDish) {
      throw new NotFoundException('Kitchen Dish not found');
    }
    return kitchenDish;
  }

  async update(id: string, updateKitchenDishDto: UpdateKitchenDishDto) {
    const kitchenDish = await this.kitchenDishesRepository.findOne(id);
    if (!kitchenDish) {
      throw new NotFoundException('Kitchen Dish not found');
    }
    return await this.kitchenDishesRepository.update(id, updateKitchenDishDto);
  }

  async remove(id: string) {
    const kitchenDish = await this.kitchenDishesRepository.findOne(id);
    if (!kitchenDish) {
      throw new NotFoundException('Kitchen Dish not found');
    }
    await this.kitchenDishesRepository.delete(id);
  }
}
