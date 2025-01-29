import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { CreateLoanTransactionDto } from '@loan-transactions/dto/create-loan-transaction.dto';
import { UpdateLoanTransactionDto } from '@loan-transactions/dto/update-loan-transaction.dto';
import { LoanTransactionsService } from '@loan-transactions/loan-transactions.service';
import { LoansService } from '@loans/loans.service';
import { AccountsService } from '@accounts/accounts.service';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';

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
  ) {}

  @Post()
  async create(@Body() createLoanTransactionDto: CreateLoanTransactionDto) {
    const loanTransaction = this.loanTransactionsService.create({
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
    return loanTransaction;
  }

  @Get()
  async findAll(@Request() req: any) {
    return this.loanTransactionsService.findAll(req.user.UserID);
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
