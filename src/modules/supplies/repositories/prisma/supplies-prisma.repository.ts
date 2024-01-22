import { Injectable } from '@nestjs/common';
import { SuppliesRepository } from '../supplies.repository';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { CreateSupplyDto } from '../../dto/create-supply.dto';
import { UpdateSupplyDto } from '../../dto/update-supply.dto';
import { Supply } from '../../entities/supply.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SuppliesPrismaRepository implements SuppliesRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateSupplyDto): Promise<Supply> {
    const supply = new Supply();
    Object.assign(supply, {
      ...data,
    });

    const newSupply = await this.prisma.supply.create({
      data: { ...supply },
    });

    return plainToInstance(Supply, newSupply);
  }

  async findAll(): Promise<Supply[]> {
    const supplies = await this.prisma.supply.findMany();
    return plainToInstance(Supply, supplies);
  }

  async findOne(id: string): Promise<Supply> {
    const supply = await this.prisma.supply.findUnique({ where: { id } });
    return plainToInstance(Supply, supply);
  }

  async update(id: string, data: UpdateSupplyDto): Promise<Supply> {
    const supply = await this.prisma.supply.update({
      where: { id },
      data,
    });

    return plainToInstance(Supply, supply);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.supply.delete({ where: { id } });
  }
}
