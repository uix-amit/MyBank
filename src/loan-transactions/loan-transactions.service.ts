import { Injectable } from '@nestjs/common';
import { LoanTransactions, Prisma } from '@prisma/client';
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

  async findAll(): Promise<LoanTransactions[]> {
    return await this.prismaService.loanTransactions.findMany();
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
