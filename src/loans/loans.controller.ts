import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Loans } from '@prisma/client';

import { LoansService } from '@loans/loans.service';
import { CreateLoanDto } from '@loans/dto/create-loan-dto';
import { UpdateLoanDto } from '@loans/dto/update-loan-dto';

@ApiTags('Loans')
@Controller({ path: 'loans', version: '1' })
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto): Promise<Loans> {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  async findAll(): Promise<Loans[]> {
    return this.loansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Loans> {
    return this.loansService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLoanDto: UpdateLoanDto,
  ): Promise<Loans> {
    return this.loansService.update(id, updateLoanDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Loans> {
    return this.loansService.remove(id);
  }
}
