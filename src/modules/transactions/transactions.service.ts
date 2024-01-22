import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './repositories/transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.transactionsRepository.create(createTransactionDto);
  }

  async findAll() {
    return this.transactionsRepository.findAll();
  }

  async findOne(id: string) {
    return this.transactionsRepository.findOne(id);
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsRepository.update(id, updateTransactionDto);
  }

  async remove(id: string) {
    return this.transactionsRepository.delete(id);
  }
}
