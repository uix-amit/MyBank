import { Injectable } from '@nestjs/common';
import { Prisma, TransactionType, Transactions } from '@prisma/client';
import { addDays, subDays } from 'date-fns';

import { FilterTransactionsDto } from '../shared/classes/filter-transactions-dto';
import { PrismaService } from '../shared/services/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createTransactionDto: Prisma.TransactionsUncheckedCreateInput,
  ): Promise<Transactions> {
    return await this.prismaService.transactions.create({
      data: createTransactionDto,
    });
  }

  async findAll(
    UserID: string,
    filters?: FilterTransactionsDto,
    limit?: number,
  ): Promise<Transactions[]> {
    return await this.prismaService.transactions.findMany({
      where: {
        TransactionType: filters?.TransactionType as TransactionType,
        Amount: {
          gte: filters?.MinAmount,
          lte: filters?.MaxAmount,
        },
        TransactionDate: {
          gte: filters?.StartDate,
          lte: filters?.EndDate,
        },
        OR: [
          {
            FromAccount: {
              UserID,
            },
          },
          {
            ToAccount: {
              UserID,
            },
          },
        ],
      },
      take: limit,
      include: {
        FromAccount: true,
        ToAccount: true,
      },
      orderBy: {
        TransactionDate: 'desc',
      },
    });
  }

  /**
   * 
   * This function needs improvement to return data in following format
   * {
        "DEBIT": [
          {
            "TransactionDate": "2025-03-04T05:32:21.106Z",
            "Amount": 3000
          },
          {
            "TransactionDate": "2025-03-05T05:32:21.106Z",
            "Amount": 3000
          }
        ],
        "CREDIT": [
          {
            "TransactionDate": "2025-03-04T05:32:21.106Z",
            "Amount": 3000
          },
          {
            "TransactionDate": "2025-03-05T05:32:21.106Z",
            "Amount": 3000
          }
        ]
      }
   */
  async getWeeklyTransactions(UserID: string): Promise<
    {
      name: string;
      data: number[];
    }[]
  > {
    const sevenDaysAgo = subDays(new Date(), 7);

    const transactions = await this.prismaService.transactions.findMany({
      where: {
        TransactionDate: {
          gte: sevenDaysAgo,
        },
        OR: [
          {
            FromAccount: {
              UserID,
            },
          },
          {
            ToAccount: {
              UserID,
            },
          },
        ],
      },
    });

    const dateRange = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(sevenDaysAgo, i);
      dateRange.push(date.toISOString().split('T')[0]);
    }

    const groupedData = transactions.reduce((acc, transaction) => {
      const dateOnly = transaction.TransactionDate.toISOString().split('T')[0];
      const transactionType =
        transaction.TransactionType === 'DEBIT' ? 'DEBIT' : 'CREDIT';

      if (!acc[transactionType]) {
        acc[transactionType] = dateRange.map(() => 0);
      }

      const dateIndex = dateRange.indexOf(dateOnly);

      if (dateIndex !== -1) {
        acc[transactionType][dateIndex - 1] += transaction.Amount;
      }

      return acc;
    }, {});

    return [
      {
        name: 'DEBIT',
        data: groupedData['DEBIT'] || dateRange.map(() => 0), // Fill with 0s if no 'DEBIT' transactions
      },
      {
        name: 'CREDIT',
        data: groupedData['CREDIT'] || dateRange.map(() => 0), // Fill with 0s if no 'CREDIT' transactions
      },
    ];
  }

  async findOne(TransactionID: string): Promise<Transactions> {
    return await this.prismaService.transactions.findFirst({
      where: { TransactionID },
    });
  }

  async update(
    TransactionID: string,
    updateTransactionDto: Prisma.TransactionsUncheckedUpdateInput,
  ): Promise<Transactions> {
    return await this.prismaService.transactions.update({
      where: { TransactionID },
      data: updateTransactionDto,
    });
  }

  async remove(TransactionID: string): Promise<Transactions> {
    return await this.prismaService.transactions.delete({
      where: { TransactionID },
    });
  }
}
