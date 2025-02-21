import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { AccountsService } from '@accounts/accounts.service';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { LoanTransactionsService } from '@loan-transactions/loan-transactions.service';
import { LoansService } from '@loans/loans.service';
import { NotificationsService } from '@notifications/notifications.service';
import { SavingsAccount } from '@prisma/client';
import { CreateTransactionDto } from '@transactions/dto/create-transaction-dto';
import { TransactionsService } from '@transactions/transactions.service';
import { BraintreeService } from './braintree.service';

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
    private readonly accountsService: AccountsService,
    private readonly notificationsService: NotificationsService,
    private readonly loansService: LoansService,
  ) {}

  @Get('client-token')
  async getClientToken(): Promise<string> {
    return this.braintreeService.generateClientToken();
  }

  @Post('checkout')
  async checkout(
    @Request() req: any,
    @Body()
    body: {
      nonce: string;
      transaction: CreateTransactionDto;
      transactionType: 'Transfer' | 'LoanRepayment';
    },
  ): Promise<{ message: string }> {
    const { nonce, transaction, transactionType } = body;
    let message: string;
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
      const fromAccountDetails: SavingsAccount =
        await this.accountsService.findOne(transaction.FromAccountID);
      this.accountsService.update(transaction.FromAccountID, {
        Balance: fromAccountDetails.Balance - transaction.Amount,
      });
      const toAccountDetails: SavingsAccount =
        await this.accountsService.findOne(transaction.ToAccountID);
      this.accountsService.update(transaction.ToAccountID, {
        Balance: toAccountDetails.Balance + transaction.Amount,
      });
      message = `Congratulations! Your new transaction of ${transaction.Amount} has been processed successfully.`;
      this.notificationsService.create({
        Message: message,
        UserID: req.user.UserID,
      });
    } else {
      await this.loanTransactionService.create({
        ...transaction,
        TransactionStatus: transaction.TransactionStatus
          ? transaction.TransactionStatus
          : 'COMPLETE',
      });
      const fromAccount = await this.accountsService.findOne(
        transaction.FromAccountID,
      );
      const toAccount = await this.loansService.findOne(
        transaction.ToAccountID,
      );
      await this.accountsService.update(transaction.FromAccountID, {
        Balance: fromAccount.Balance - transaction.Amount,
      });
      await this.loansService.update(transaction.ToAccountID, {
        LoanAmount: toAccount.LoanAmount - transaction.Amount,
      });
      message = `Congratulations! Your new transaction of ${transaction.Amount} has been processed successfully.`;
      this.notificationsService.create({
        Message: message,
        UserID: req.user.UserID,
      });
    }

    return { message };
  }
}
