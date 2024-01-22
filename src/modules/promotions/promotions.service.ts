import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionsRepository } from './repositories/promotions.repository';

@Injectable()
export class PromotionsService {
  constructor(private promotionsRepository: PromotionsRepository) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const promotion =
      await this.promotionsRepository.create(createPromotionDto);
    return promotion;
  }

  async findAll() {
    const promotions = await this.promotionsRepository.findAll();
    return promotions;
  }

  async findOne(id: string) {
    const promotion = await this.promotionsRepository.findOne(id);
    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }
    return promotion;
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionsRepository.update(
      id,
      updatePromotionDto,
    );
    return promotion;
  }

  async remove(id: string) {
    await this.promotionsRepository.delete(id);
  }
}
