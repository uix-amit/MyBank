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
import { SavingsAccount } from '@prisma/client';

import { AccountsService } from '@accounts/accounts.service';
import { CreateAccountDto } from '@accounts/dto/create-account-dto';
import { UpdateAccountDto } from '@accounts/dto/update-account-dto';

@ApiTags('Savings Account')
@Controller({ path: 'savings-account', version: '1' })
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<SavingsAccount> {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  async findAll(): Promise<SavingsAccount[]> {
    return this.accountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SavingsAccount> {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<SavingsAccount> {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SavingsAccount> {
    return this.accountsService.remove(id);
  }
}
