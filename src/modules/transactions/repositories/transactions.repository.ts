import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionsRepository {
  abstract create(
    data: CreateTransactionDto,
  ): Promise<Transaction> | Transaction;
  abstract findAll(): Promise<Transaction[]> | object;
  abstract findOne(id: string): Promise<Transaction> | Transaction;
  abstract update(
    id: string,
    data: UpdateTransactionDto,
  ): Promise<Transaction> | Transaction;
  abstract delete(id: string): Promise<void> | void;
}
