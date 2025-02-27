import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccountPreferencesService } from '@accountPreferences/account-preferences.service';
import { AccountsService } from '@accounts/accounts.service';
import { AuthService } from '@auth/auth.service';
import { OtpDto } from '@auth/dto/otp-dto';
import { IsPublic } from '@auth/is-public/is-public.decorator';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from '@auth/local-auth/local-auth.guard';
import { LoanTransactionsService } from '@loan-transactions/loan-transactions.service';
import { TransactionsService } from '@transactions/transactions.service';
import { AppService } from './app.service';
import { LoanTransactions, SavingsAccount, Transactions } from '@prisma/client';

@IsPublic()
@ApiTags('Index')
@Controller({ path: '/', version: '1' })
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly accountsService: AccountsService,
    private readonly transactionsService: TransactionsService,
    private readonly loanTransactionsService: LoanTransactionsService,
    private readonly authService: AuthService,
    private readonly accountPreferencesService: AccountPreferencesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDashboardData(@Request() req: any) {
    const accounts: SavingsAccount[] = await this.accountsService.findAll(
      req.user.UserID,
      2,
    );
    const accountBalanceByBank =
      await this.accountsService.getBalanceGroupByBank(req.user.UserID);
    const transactions: Transactions[] = await this.transactionsService.findAll(
      req.user.UserID,
      undefined,
      3,
    );
    const weeklyTransactions: Transactions[] =
      await this.transactionsService.getWeeklyTransactions(req.user.UserID);
    const loanTransactions: LoanTransactions[] =
      await this.loanTransactionsService.findAll(req.user.UserID, undefined, 5);

    return this.appService.getDashboardData({
      accounts,
      transactions,
      loanTransactions,
      accountBalanceByBank,
      weeklyTransactions,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    const accountPreferences =
      await this.accountPreferencesService.findOneByUserID(req.user.UserID);
    if (accountPreferences.EnableTwoFactorAuth) {
      return this.authService.sendOtp(req.user);
    } else {
      return this.authService.login(req.user.UserID);
    }
  }

  @Post('auth/otp')
  async validateOtp(@Body() otpDto: OtpDto) {
    const userId = await this.authService.validateOtp(otpDto.id, otpDto.otp);
    return this.authService.login(userId);
  }
}
