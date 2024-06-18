import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LoanAccount, Prisma } from '@prisma/client';

import { LoansService } from '@loans/loans.service';

@Controller({ path: 'loans', version: '1' })
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  async create(
    @Body() createLoanDto: Prisma.LoanAccountCreateInput,
  ): Promise<LoanAccount> {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  async findAll(): Promise<LoanAccount[]> {
    return this.loansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LoanAccount> {
    return this.loansService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoanDto: Prisma.LoanAccountUpdateInput,
    async,
  ): Promise<LoanAccount> {
    return this.loansService.update(id, updateLoanDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<LoanAccount> {
    return this.loansService.remove(id);
  }
}
