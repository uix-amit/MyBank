import { Injectable } from '@nestjs/common';
import { Prisma, Transactions } from '@prisma/client';

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

  async findAll(): Promise<Transactions[]> {
    return await this.prismaService.transactions.findMany();
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
