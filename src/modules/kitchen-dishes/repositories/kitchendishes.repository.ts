import { CreateKitchenDishDto } from '../dto/create-kitchendish.dto';
import { UpdateKitchenDishDto } from '../dto/update-kitchendish.dto';
import { KitchenDish } from '../entities/kitchendish.entity';

export abstract class KitchenDishesRepository {
  abstract create(
    data: CreateKitchenDishDto,
  ): Promise<KitchenDish> | KitchenDish;
  abstract findAll(): Promise<KitchenDish[]> | KitchenDish[];
  abstract findOne(id: string): Promise<KitchenDish> | KitchenDish;
  abstract update(
    id: string,
    data: UpdateKitchenDishDto,
  ): Promise<KitchenDish> | KitchenDish;
  abstract delete(id: string): Promise<void> | void;
}
