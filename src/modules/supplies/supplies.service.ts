import { Injectable, NotFoundException } from '@nestjs/common';
import { SuppliesRepository } from './repositories/supplies.repository';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';

@Injectable()
export class SuppliesService {
  constructor(private suppliesRepository: SuppliesRepository) {}

  async create(createSupplyDto: CreateSupplyDto) {
    const supply = await this.suppliesRepository.create(createSupplyDto);
    return supply;
  }

  async findAll() {
    const supplies = await this.suppliesRepository.findAll();
    return supplies;
  }

  async findOne(id: string) {
    const supply = await this.suppliesRepository.findOne(id);
    if (!supply) {
      throw new NotFoundException('Supply not found');
    }
    return supply;
  }

  async update(id: string, updateSupplyDto: UpdateSupplyDto) {
    const supply = await this.suppliesRepository.update(id, updateSupplyDto);
    return supply;
  }

  async remove(id: string) {
    await this.suppliesRepository.delete(id);
  }
}
