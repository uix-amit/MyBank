import { Module } from '@nestjs/common';

import { AccountsService } from '../accounts/accounts.service';
import { LoanTransactionsService } from '../loan-transactions/loan-transactions.service';
import { LoansService } from '../loans/loans.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PrismaService } from '../shared/services/prisma/prisma.service';
import { TransactionsService } from '../transactions/transactions.service';
import { BraintreeController } from './braintree.controller';
import { BraintreeService } from './braintree.service';

@Module({
  controllers: [BraintreeController],
  providers: [
    BraintreeService,
    TransactionsService,
    PrismaService,
    LoanTransactionsService,
    AccountsService,
    NotificationsService,
    LoansService,
  ],
})
export class BraintreeModule {}
