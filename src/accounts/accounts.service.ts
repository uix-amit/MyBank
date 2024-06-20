import { Injectable } from '@nestjs/common';
import { Prisma, SavingsAccount } from '@prisma/client';

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

  async findAll(): Promise<SavingsAccount[]> {
    return await this.prismaService.savingsAccount.findMany();
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
