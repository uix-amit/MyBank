import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { BraintreeService } from './braintree.service';
import { CreateTransactionDto } from '@transactions/dto/create-transaction-dto';
import { TransactionsService } from '@transactions/transactions.service';

@ApiTags('Braintree')
@ApiBearerAuth('Authorization')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@UseGuards(JwtAuthGuard)
@Controller({ path: 'braintree', version: '1' })
export class BraintreeController {
  constructor(
    private readonly braintreeService: BraintreeService,
    private readonly transactionService: TransactionsService,
  ) {}

  @Get('client-token')
  async getClientToken(): Promise<string> {
    return this.braintreeService.generateClientToken();
  }

  @Post('checkout')
  async checkout(
    @Body()
    body: {
      paymentMethodNonce: string;
      transaction: CreateTransactionDto;
    },
  ) {
    const { paymentMethodNonce, transaction } = body;
    const braintreeTransactionResponse =
      await this.braintreeService.processPayment(
        transaction.Amount,
        paymentMethodNonce,
      );
    await this.transactionService.create({
      ...transaction,
      TransactionType: transaction.TransactionType
        ? transaction.TransactionType
        : 'DEBIT',
      TransactionStatus: transaction.TransactionStatus
        ? transaction.TransactionStatus
        : 'COMPLETE',
    });

    return braintreeTransactionResponse;
  }
}
