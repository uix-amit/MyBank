import { Injectable } from '@nestjs/common';
import { Prisma, TransactionType, Transactions } from '@prisma/client';
import { FilterTransactionsDto } from '@shared/classes/filter-transactions-dto';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

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
        TransactionType: filters.TransactionType as TransactionType,
        Amount: {
          gte: filters.MinAmount,
          lte: filters.MaxAmount,
        },
        TransactionDate: {
          gte: filters.StartDate,
          lte: filters.EndDate,
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

  async getWeeklyTransactions(UserID: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return await this.prismaService.transactions.groupBy({
      by: ['TransactionType', 'TransactionDate'],
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
      _sum: {
        Amount: true,
      },
      orderBy: {
        TransactionDate: 'desc',
      },
    });
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
