import { Injectable } from '@nestjs/common';
import { CheckoutsRepository } from './repositories/checkouts.repository';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Injectable()
export class CheckoutsService {
  constructor(private checkoutsRepository: CheckoutsRepository) {}

  async create(createCheckoutDto: CreateCheckoutDto) {
    return this.checkoutsRepository.create(createCheckoutDto);
  }

  async findAll() {
    return this.checkoutsRepository.findAll();
  }

  async findOne(id: string) {
    return this.checkoutsRepository.findOne(id);
  }

  async update(id: string, updateCheckoutDto: UpdateCheckoutDto) {
    return this.checkoutsRepository.update(id, updateCheckoutDto);
  }

  async remove(id: string): Promise<void> {
    return this.checkoutsRepository.delete(id);
  }
}
