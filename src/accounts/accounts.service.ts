import { Injectable } from '@nestjs/common';
import { Banks, Prisma, SavingsAccount } from '@prisma/client';
import { AccountStatsDto } from '@shared/classes/account-stats-dto';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAccountDto: Prisma.SavingsAccountUncheckedCreateInput,
  ): Promise<SavingsAccount> {
    return await this.prismaService.savingsAccount.create({
      data: createAccountDto,
    });
  }

  async findAll(
    UserID: string,
  ): Promise<Array<SavingsAccount & { Bank: { BankName: string } }>> {
    return await this.prismaService.savingsAccount.findMany({
      where: { UserID },
      include: {
        Bank: {
          select: {
            BankName: true,
          },
        },
      },
    });
  }

  async getAccountStats(UserID: string): Promise<AccountStatsDto> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const totalBalanceResult =
      await this.prismaService.savingsAccount.aggregate({
        where: { UserID },
        _sum: {
          Balance: true,
        },
      });

    const debitTransactions = await this.prismaService.transactions.aggregate({
      where: {
        FromAccount: { UserID },
        TransactionDate: {
          gte: thirtyDaysAgo,
        },
      },
      _sum: {
        Amount: true,
      },
      _count: {
        Amount: true,
      },
    });

    const creditTransactions = await this.prismaService.transactions.aggregate({
      where: {
        ToAccount: { UserID },
        TransactionDate: {
          gte: thirtyDaysAgo,
        },
      },
      _sum: {
        Amount: true,
      },
      _count: {
        Amount: true,
      },
    });

    return {
      Balance: totalBalanceResult._sum.Balance || 0,
      Income: {
        numberOfTransactions: creditTransactions._count.Amount,
        amountOfTransactions: creditTransactions._sum.Amount,
      },
      Expenses: {
        numberOfTransactions: debitTransactions._count.Amount,
        amountOfTransactions: debitTransactions._sum.Amount,
      },
      Savings: creditTransactions._sum.Amount - debitTransactions._sum.Amount,
    };
  }

  async getBanks(): Promise<Banks[]> {
    return await this.prismaService.banks.findMany();
  }

  async findOne(AccountID: string): Promise<SavingsAccount> {
    return await this.prismaService.savingsAccount.findFirst({
      where: {
        AccountID,
      },
    });
  }

  async update(
    AccountID: string,
    updateAccountDto: Prisma.SavingsAccountUncheckedUpdateInput,
  ): Promise<SavingsAccount> {
    return await this.prismaService.savingsAccount.update({
      where: { AccountID },
      data: updateAccountDto,
    });
  }

  async remove(AccountID: string): Promise<SavingsAccount> {
    return await this.prismaService.savingsAccount.delete({
      where: { AccountID },
    });
  }
}
