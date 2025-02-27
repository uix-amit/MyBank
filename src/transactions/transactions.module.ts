import { Module } from '@nestjs/common';

import { AccountsModule } from '@accounts/accounts.module';
import { SharedModule } from '@shared/shared.module';
import { TransactionsController } from '@transactions/transactions.controller';
import { TransactionsService } from '@transactions/transactions.service';

@Module({
  imports: [SharedModule, AccountsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
