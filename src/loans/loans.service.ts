import { Injectable } from '@nestjs/common';
import { Loans, Prisma } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class LoansService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createLoanDto: Prisma.LoansUncheckedCreateInput,
  ): Promise<Loans> {
    return await this.prismaService.loans.create({ data: createLoanDto });
  }

  async findAll(UserID: string): Promise<Loans[]> {
    return await this.prismaService.loans.findMany({
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

  async findOne(LoanID: string): Promise<Loans> {
    return await this.prismaService.loans.findFirst({ where: { LoanID } });
  }

  async update(
    LoanID: string,
    updateLoanDto: Prisma.LoansUncheckedUpdateInput,
  ): Promise<Loans> {
    return await this.prismaService.loans.update({
      where: { LoanID },
      data: updateLoanDto,
    });
  }

  async remove(LoanID: string): Promise<Loans> {
    return await this.prismaService.loans.delete({ where: { LoanID } });
  }
}
