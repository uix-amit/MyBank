import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { AccountsService } from '@accounts/accounts.service';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { CreateLoanTransactionDto } from '@loan-transactions/dto/create-loan-transaction.dto';
import { UpdateLoanTransactionDto } from '@loan-transactions/dto/update-loan-transaction.dto';
import { LoanTransactionsService } from '@loan-transactions/loan-transactions.service';
import { LoansService } from '@loans/loans.service';
import { NotificationsService } from '@notifications/notifications.service';
import { FilterTransactionsDto } from '@shared/classes/filter-transactions-dto';

@ApiTags('Loan Account Transactions')
@ApiBearerAuth('Authorization')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@UseGuards(JwtAuthGuard)
@Controller({ path: 'loan-transactions', version: '1' })
export class LoanTransactionsController {
  constructor(
    private readonly loanTransactionsService: LoanTransactionsService,
    private readonly loansService: LoansService,
    private readonly accountsService: AccountsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createLoanTransactionDto: CreateLoanTransactionDto,
  ) {
    const loanTransaction = await this.loanTransactionsService.create({
      ...createLoanTransactionDto,
      TransactionStatus: createLoanTransactionDto.TransactionStatus
        ? createLoanTransactionDto.TransactionStatus
        : 'COMPLETE',
    });
    const fromAccount = await this.accountsService.findOne(
      createLoanTransactionDto.FromAccountID,
    );
    const toAccount = await this.loansService.findOne(
      createLoanTransactionDto.ToAccountID,
    );
    await this.accountsService.update(createLoanTransactionDto.FromAccountID, {
      Balance: fromAccount.Balance - createLoanTransactionDto.Amount,
    });
    await this.loansService.update(createLoanTransactionDto.ToAccountID, {
      LoanAmount: toAccount.LoanAmount - createLoanTransactionDto.Amount,
    });
    this.notificationsService.create({
      Message: `Congratulations! Your new transaction of ${loanTransaction.Amount} has been processed successfully.`,
      UserID: req.user.UserID,
    });
    return loanTransaction;
  }

  @Get()
  async findAll(@Request() req: any) {
    return this.loanTransactionsService.findAll(req.user.UserID);
  }

  @Get('/filter')
  async findAllByFilter(
    @Request() req: any,
    @Query() filters: FilterTransactionsDto,
  ) {
    return this.loanTransactionsService.findAllByFilter(
      req.user.UserID,
      filters,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.loanTransactionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLoanTransactionDto: UpdateLoanTransactionDto,
  ) {
    return this.loanTransactionsService.update(id, updateLoanTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.loanTransactionsService.remove(id);
  }
}
