import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { LocalAuthGuard } from '@auth/local-auth/local-auth.guard';
import { AuthService } from '@auth/auth.service';
import { IsPublic } from '@auth/is-public/is-public.decorator';

@IsPublic()
@ApiTags('Index')
@Controller({ path: '/', version: '1' })
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
