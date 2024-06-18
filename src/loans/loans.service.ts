import { Injectable } from '@nestjs/common';
import { LoanAccount, Prisma } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class LoansService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createLoanDto: Prisma.LoanAccountCreateInput,
  ): Promise<LoanAccount> {
    return await this.prismaService.loanAccount.create({ data: createLoanDto });
  }

  async findAll(): Promise<LoanAccount[]> {
    return await this.prismaService.loanAccount.findMany();
  }

  async findOne(id: string): Promise<LoanAccount> {
    return await this.prismaService.loanAccount.findFirst({ where: { id } });
  }

  async update(
    id: string,
    updateLoanDto: Prisma.LoanAccountUpdateInput,
  ): Promise<LoanAccount> {
    return await this.prismaService.loanAccount.update({
      where: { id },
      data: updateLoanDto,
    });
  }

  async remove(id: string): Promise<LoanAccount> {
    return await this.prismaService.loanAccount.delete({ where: { id } });
  }
}
