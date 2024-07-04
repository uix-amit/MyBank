import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateLoanTransactionDto } from '@loan-transactions/dto/create-loan-transaction.dto';
import { UpdateLoanTransactionDto } from '@loan-transactions/dto/update-loan-transaction.dto';
import { LoanTransactionsService } from '@loan-transactions/loan-transactions.service';

@ApiTags('Loan Account Transactions')
@ApiBearerAuth('Authorization')
@Controller({ path: 'loan-transactions', version: '1' })
export class LoanTransactionsController {
  constructor(
    private readonly loanTransactionsService: LoanTransactionsService,
  ) {}

  @Post()
  async create(@Body() createLoanTransactionDto: CreateLoanTransactionDto) {
    return this.loanTransactionsService.create(createLoanTransactionDto);
  }

  @Get()
  async findAll() {
    return this.loanTransactionsService.findAll();
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
