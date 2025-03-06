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
import { SavingsAccount, Transactions } from '@prisma/client';

import { AccountsService } from '../accounts/accounts.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { NotificationsService } from '../notifications/notifications.service';
import { FilterTransactionsDto } from '../shared/classes/filter-transactions-dto';
import { IdValidationDto } from '../shared/validators/id-validation-dto';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { UpdateTransactionDto } from './dto/update-transaction-dto';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@ApiBearerAuth('Authorization')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@UseGuards(JwtAuthGuard)
@Controller({ path: 'transactions', version: '1' })
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly accountsService: AccountsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transactions> {
    const transation = await this.transactionsService.create({
      ...createTransactionDto,
      TransactionType: createTransactionDto.TransactionType
        ? createTransactionDto.TransactionType
        : 'DEBIT',
      TransactionStatus: createTransactionDto.TransactionStatus
        ? createTransactionDto.TransactionStatus
        : 'COMPLETE',
    });
    const fromAccountDetails: SavingsAccount =
      await this.accountsService.findOne(createTransactionDto.FromAccountID);
    this.accountsService.update(createTransactionDto.FromAccountID, {
      Balance: fromAccountDetails.Balance - createTransactionDto.Amount,
    });
    const toAccountDetails: SavingsAccount = await this.accountsService.findOne(
      createTransactionDto.ToAccountID,
    );
    this.accountsService.update(createTransactionDto.ToAccountID, {
      Balance: toAccountDetails.Balance + createTransactionDto.Amount,
    });
    this.notificationsService.create({
      Message: `Congratulations! Your new transaction of ${transation.Amount} has been processed successfully.`,
      UserID: req.user.UserID,
    });
    return transation;
  }

  @Get()
  async findAll(
    @Request() req: any,
    @Query() filterDto: FilterTransactionsDto,
  ): Promise<Transactions[]> {
    return this.transactionsService.findAll(req.user.UserID, filterDto);
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
