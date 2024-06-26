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
import { Transactions } from '@prisma/client';

import { TransactionsService } from '@transactions/transactions.service';
import { CreateTransactionDto } from '@transactions/dto/create-transaction-dto';
import { UpdateTransactionDto } from '@transactions/dto/update-transaction-dto';
import { IdValidationDto } from '@shared/validators/id-validation-dto';

@ApiTags('Transactions')
@Controller({ path: 'transactions', version: '1' })
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transactions> {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll(): Promise<Transactions[]> {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<Transactions> {
    return this.transactionsService.findOne(idValidationDto.id);
  }

  @Patch(':id')
  async update(
    @Param() idValidationDto: IdValidationDto,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transactions> {
    return this.transactionsService.update(
      idValidationDto.id,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  async remove(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<Transactions> {
    return this.transactionsService.remove(idValidationDto.id);
  }
}
