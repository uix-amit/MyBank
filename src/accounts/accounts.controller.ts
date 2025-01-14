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
import { SavingsAccount } from '@prisma/client';

import { AccountsService } from '@accounts/accounts.service';
import { CreateAccountDto } from '@accounts/dto/create-account-dto';
import { UpdateAccountDto } from '@accounts/dto/update-account-dto';
import { IdValidationDto } from '@shared/validators/id-validation-dto';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';

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
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<SavingsAccount> {
    const UserID = req.user.UserID;
    return this.accountsService.create({ ...createAccountDto, UserID });
  }

  @Get()
  async findAll(): Promise<SavingsAccount[]> {
    return this.accountsService.findAll();
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
