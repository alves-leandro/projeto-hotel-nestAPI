import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { CreatePromotionDto } from '../../dto/create-promotion.dto';
import { UpdatePromotionDto } from '../../dto/update-promotion.dto';
import { Promotion } from '../../entities/promotion.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PromotionsPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePromotionDto): Promise<Promotion> {
    const promotion = new Promotion();
    Object.assign(promotion, data);

    promotion.initialDate = new Date(data.initialDate);
    promotion.endDate = new Date(data.endDate);

    const newPromotion = await this.prisma.promotion.create({
      data: { ...promotion },
    });

    return plainToInstance(Promotion, newPromotion);
  }

  async findAll(): Promise<Promotion[]> {
    const promotions = await this.prisma.promotion.findMany();
    return plainToInstance(Promotion, promotions);
  }

  async findOne(id: string): Promise<Promotion> {
    const promotion = await this.prisma.promotion.findUnique({ where: { id } });
    return plainToInstance(Promotion, promotion);
  }

  async update(id: string, data: UpdatePromotionDto): Promise<Promotion> {
    const promotion = await this.prisma.promotion.update({
      where: { id },
      data,
    });

    return plainToInstance(Promotion, promotion);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.promotion.delete({ where: { id } });
  }
}
