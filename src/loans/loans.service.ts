import { Injectable } from '@nestjs/common';
import { Loans, Prisma } from '@prisma/client';

import { PrismaService } from '@sharedServices/prisma/prisma.service';

@Injectable()
export class LoansService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLoanDto: Prisma.LoansCreateInput): Promise<Loans> {
    return await this.prismaService.loans.create({ data: createLoanDto });
  }

  async findAll(): Promise<Loans[]> {
    return await this.prismaService.loans.findMany();
  }

  async findOne(LoanID: string): Promise<Loans> {
    return await this.prismaService.loans.findFirst({ where: { LoanID } });
  }

  async update(
    LoanID: string,
    updateLoanDto: Prisma.LoansUpdateInput,
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
