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
import { Banks, SavingsAccount } from '@prisma/client';

import { AccountsService } from '@accounts/accounts.service';
import { CreateAccountDto } from '@accounts/dto/create-account-dto';
import { UpdateAccountDto } from '@accounts/dto/update-account-dto';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { NotificationsService } from '@notifications/notifications.service';
import { IdValidationDto } from '@shared/validators/id-validation-dto';

@ApiTags('Savings Account')
@ApiBearerAuth('Authorization')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@UseGuards(JwtAuthGuard)
@Controller({ path: 'savings-account', version: '1' })
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<SavingsAccount> {
    const UserID = req.user.UserID;
    const savingsAccount = await this.accountsService.create({
      ...createAccountDto,
      UserID,
    });
    this.notificationsService.create({
      Message: `Congratulations! Your new savings account ${savingsAccount.AccountNumber} has been created successfully.`,
      UserID,
    });
    return savingsAccount;
  }

  @Get()
  async findAll(
    @Request() req: any,
  ): Promise<Array<SavingsAccount & { Bank: { BankName: string } }>> {
    const UserID = req.user.UserID;
    return this.accountsService.findAll(UserID);
  }

  @Get('banks')
  async findAllBanks(): Promise<Banks[]> {
    return this.accountsService.getBanks();
  }

  @Get(':id')
  async findOne(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<SavingsAccount> {
    return this.accountsService.findOne(idValidationDto.id);
  }

  @Patch(':id')
  async update(
    @Param() idValidationDto: IdValidationDto,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<SavingsAccount> {
    return this.accountsService.update(idValidationDto.id, updateAccountDto);
  }

  @Delete(':id')
  async remove(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<SavingsAccount> {
    return this.accountsService.remove(idValidationDto.id);
  }
}
