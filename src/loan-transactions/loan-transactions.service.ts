import { Injectable } from '@nestjs/common';
import { LoanTransactions, LoanType, Prisma } from '@prisma/client';
import { FilterTransactionsDto } from '@shared/classes/filter-transactions-dto';
import { PrismaService } from '@shared/services/prisma/prisma.service';

@Injectable()
export class LoanTransactionsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createLoanTransactionDto: Prisma.LoanTransactionsUncheckedCreateInput,
  ): Promise<LoanTransactions> {
    return await this.prismaService.loanTransactions.create({
      data: createLoanTransactionDto,
    });
  }

  async findAll(UserID: string): Promise<LoanTransactions[]> {
    return await this.prismaService.loanTransactions.findMany({
      where: {
        OR: [
          {
            FromAccount: { UserID },
          },
          {
            ToAccount: { UserID },
          },
        ],
      },
      include: {
        FromAccount: true,
        ToAccount: true,
      },
      orderBy: {
        TransactionDate: 'desc',
      },
    });
  }

  async findAllByFilter(
    UserID: string,
    filter: FilterTransactionsDto,
  ): Promise<LoanTransactions[]> {
    return await this.prismaService.loanTransactions.findMany({
      where: {
        Amount: {
          gte: filter.MinAmount,
          lte: filter.MaxAmount,
        },
        ToAccount: {
          LoanType: filter.TransactionType as LoanType,
        },
        TransactionDate: {
          gte: filter.StartDate,
          lte: filter.EndDate,
        },
        OR: [
          {
            FromAccount: { UserID },
          },
          {
            ToAccount: { UserID },
          },
        ],
      },
      include: {
        FromAccount: true,
        ToAccount: true,
      },
      orderBy: {
        TransactionDate: 'desc',
      },
    });
  }

  async findOne(TransactionID: string): Promise<LoanTransactions> {
    return await this.prismaService.loanTransactions.findFirst({
      where: { TransactionID },
    });
  }

  async update(
    TransactionID: string,
    updateLoanTransactionDto: Prisma.LoanTransactionsUncheckedUpdateInput,
  ): Promise<LoanTransactions> {
    return await this.prismaService.loanTransactions.update({
      where: { TransactionID },
      data: updateLoanTransactionDto,
    });
  }

  async remove(TransactionID: string): Promise<LoanTransactions> {
    return await this.prismaService.loanTransactions.delete({
      where: { TransactionID },
    });
  }
}
