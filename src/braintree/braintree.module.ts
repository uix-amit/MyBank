import { Module } from '@nestjs/common';

import { LoanTransactionsService } from '@loan-transactions/loan-transactions.service';
import { PrismaService } from '@shared/services/prisma/prisma.service';
import { TransactionsService } from '@transactions/transactions.service';
import { BraintreeController } from './braintree.controller';
import { BraintreeService } from './braintree.service';

@Module({
  controllers: [BraintreeController],
  providers: [
    BraintreeService,
    TransactionsService,
    PrismaService,
    LoanTransactionsService,
  ],
})
export class BraintreeModule {}
