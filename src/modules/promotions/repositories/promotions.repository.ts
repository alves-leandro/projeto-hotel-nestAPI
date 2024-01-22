import { CreatePromotionDto } from '../dto/create-promotion.dto';
import { UpdatePromotionDto } from '../dto/update-promotion.dto';
import { Promotion } from '../entities/promotion.entity';

export abstract class PromotionsRepository {
  abstract create(data: CreatePromotionDto): Promise<Promotion> | Promotion;
  abstract findAll(): Promise<Promotion[]> | object;
  abstract findOne(id: string): Promise<Promotion> | Promotion;
  abstract update(
    id: string,
    data: UpdatePromotionDto,
  ): Promise<Promotion> | Promotion;
  abstract delete(id: string): Promise<void> | void;
}
