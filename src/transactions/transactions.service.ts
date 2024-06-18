import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createTransactionDto: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    return await this.prismaService.transaction.create({
      data: createTransactionDto,
    });
  }

  async findAll(): Promise<Transaction[]> {
    return await this.prismaService.transaction.findMany();
  }

  async findOne(id: string): Promise<Transaction> {
    return await this.prismaService.transaction.findFirst({ where: { id } });
  }

  async update(
    id: string,
    updateTransactionDto: Prisma.TransactionUpdateInput,
  ): Promise<Transaction> {
    return await this.prismaService.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  async remove(id: string): Promise<Transaction> {
    return await this.prismaService.transaction.delete({ where: { id } });
  }
}
