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
import { AuthService } from '@auth/auth.service';
import { OtpDto } from '@auth/dto/otp-dto';
import { IsPublic } from '@auth/is-public/is-public.decorator';
import { LocalAuthGuard } from '@auth/local-auth/local-auth.guard';
import { AppService } from './app.service';

@IsPublic()
@ApiTags('Index')
@Controller({ path: '/', version: '1' })
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly accountPreferencesService: AccountPreferencesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
