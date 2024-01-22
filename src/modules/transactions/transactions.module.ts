import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/database/PrismaServiceDatabase';
import { TransactionsRepository } from './repositories/transactions.repository';
import { TransactionsPrismaRepository } from './repositories/prisma/transactions-prisma.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    PrismaService,
    {
      provide: TransactionsRepository,
      useClass: TransactionsPrismaRepository,
    },
  ],
})
export class TransactionsModule {}
