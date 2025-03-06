import { Injectable } from '@nestjs/common';
import { Loans, Prisma } from '@prisma/client';

import { LoanAccountStatsDto } from '../shared/classes/loan-account-stats-dto';
import { PrismaService } from '../shared/services/prisma/prisma.service';

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

  calculateEMI(
    principal: number,
    annualInterestRate: number,
    tenureInMonths: number,
  ): number {
    // Convert annual interest rate to monthly and decimal
    const monthlyInterestRate = annualInterestRate / 12 / 100;

    // Calculate EMI using the formula
    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenureInMonths)) /
      (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

    return parseFloat(emi.toFixed(2)); // Return EMI rounded to 2 decimal places
  }

  async getLoanAccountStats(UserID: string): Promise<LoanAccountStatsDto> {
    const totalLoanBalanceResult = await this.prismaService.loans.aggregate({
      where: { UserID },
      _avg: {
        InterestRate: true,
        RemainingTenure: true,
      },
      _sum: {
        LoanAmount: true,
      },
    });

    const EMI: number = this.calculateEMI(
      totalLoanBalanceResult._sum.LoanAmount,
      totalLoanBalanceResult._avg.InterestRate,
      totalLoanBalanceResult._avg.RemainingTenure,
    );

    return {
      LoanAmount: totalLoanBalanceResult._sum.LoanAmount,
      EMI,
      InterestPaid: parseFloat(
        (
          EMI * totalLoanBalanceResult._avg.RemainingTenure -
          totalLoanBalanceResult._sum.LoanAmount
        ).toFixed(2),
      ),
    };
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
