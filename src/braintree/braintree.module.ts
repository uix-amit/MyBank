import { Module } from '@nestjs/common';

import { PrismaService } from '@shared/services/prisma/prisma.service';
import { TransactionsService } from '@transactions/transactions.service';
import { BraintreeController } from './braintree.controller';
import { BraintreeService } from './braintree.service';

@Module({
  controllers: [BraintreeController],
  providers: [BraintreeService, TransactionsService, PrismaService],
})
export class BraintreeModule {}
