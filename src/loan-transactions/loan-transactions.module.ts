import { Module } from '@nestjs/common';

import { AccountsModule } from '../accounts/accounts.module';
import { LoansModule } from '../loans/loans.module';
import { SharedModule } from '../shared/shared.module';
import { LoanTransactionsController } from './loan-transactions.controller';
import { LoanTransactionsService } from './loan-transactions.service';

@Module({
  imports: [SharedModule, AccountsModule, LoansModule],
  controllers: [LoanTransactionsController],
  providers: [LoanTransactionsService],
  exports: [LoanTransactionsService],
})
export class LoanTransactionsModule {}
