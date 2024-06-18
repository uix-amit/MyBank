import { Injectable } from '@nestjs/common';
import { Prisma, SavingsAccount } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAccountDto: Prisma.SavingsAccountCreateInput,
  ): Promise<SavingsAccount> {
    return await this.prismaService.savingsAccount.create({
      data: createAccountDto,
    });
  }

  async findAll(): Promise<SavingsAccount[]> {
    return await this.prismaService.savingsAccount.findMany();
  }

  async findOne(id: string): Promise<SavingsAccount> {
    return await this.prismaService.savingsAccount.findFirst({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateAccountDto: Prisma.SavingsAccountUpdateInput,
  ): Promise<SavingsAccount> {
    return await this.prismaService.savingsAccount.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  async remove(id: string): Promise<SavingsAccount> {
    return await this.prismaService.savingsAccount.delete({
      where: { id },
    });
  }
}
