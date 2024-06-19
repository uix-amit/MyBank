import { Module } from '@nestjs/common';

import { SharedModule } from '@shared/shared.module';
import { TransactionsController } from '@transactions/transactions.controller';
import { TransactionsService } from '@transactions/transactions.service';

@Module({
  imports: [SharedModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
