import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { BraintreeService } from './braintree.service';
import { CreateTransactionDto } from '@transactions/dto/create-transaction-dto';
import { TransactionsService } from '@transactions/transactions.service';
import { LoanTransactionsService } from '@loan-transactions/loan-transactions.service';

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
    private readonly loanTransactionService: LoanTransactionsService,
  ) {}

  @Get('client-token')
  async getClientToken(): Promise<string> {
    return this.braintreeService.generateClientToken();
  }

  @Post('checkout')
  async checkout(
    @Body()
    body: {
      nonce: string;
      transaction: CreateTransactionDto;
      transactionType: 'Transfer' | 'LoanRepayment';
    },
  ) {
    const { nonce, transaction, transactionType } = body;
    const braintreeTransactionResponse =
      await this.braintreeService.processPayment(transaction.Amount, nonce);
    if (transactionType === 'Transfer') {
      await this.transactionService.create({
        ...transaction,
        TransactionType: transaction.TransactionType
          ? transaction.TransactionType
          : 'DEBIT',
        TransactionStatus: transaction.TransactionStatus
          ? transaction.TransactionStatus
          : 'COMPLETE',
      });
    } else {
      await this.loanTransactionService.create({
        ...transaction,
        TransactionStatus: transaction.TransactionStatus
          ? transaction.TransactionStatus
          : 'COMPLETE',
      });
    }

    return braintreeTransactionResponse;
  }
}
