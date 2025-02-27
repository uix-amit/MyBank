import { Injectable } from '@nestjs/common';

import { SavingsAccount, Transactions, LoanTransactions } from '@prisma/client';

@Injectable()
export class AppService {
  async getDashboardData(rawData: {
    accounts: SavingsAccount[];
    transactions: Transactions[];
    loanTransactions: LoanTransactions[];
    accountBalanceByBank: {
      BankName: string;
      TotalBalance: number;
    }[];
    weeklyTransactions: any;
  }) {
    return rawData;
  }
}
