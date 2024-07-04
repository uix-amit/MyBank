import { Module } from '@nestjs/common';

import { LoanTransactionsController } from '@loan-transactions/loan-transactions.controller';
import { LoanTransactionsService } from '@loan-transactions/loan-transactions.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [LoanTransactionsController],
  providers: [LoanTransactionsService],
})
export class LoanTransactionsModule {}
