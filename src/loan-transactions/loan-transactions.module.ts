import { Module } from '@nestjs/common';

import { AccountsModule } from '@accounts/accounts.module';
import { LoanTransactionsController } from '@loan-transactions/loan-transactions.controller';
import { LoanTransactionsService } from '@loan-transactions/loan-transactions.service';
import { LoansModule } from '@loans/loans.module';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule, AccountsModule, LoansModule],
  controllers: [LoanTransactionsController],
  providers: [LoanTransactionsService],
})
export class LoanTransactionsModule {}
