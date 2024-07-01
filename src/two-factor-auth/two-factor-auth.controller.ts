import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TwoFactorAuth } from '@prisma/client';

import { TwoFactorAuthService } from '@two-factor-auth/two-factor-auth.service';
import { CreateTwoFactorAuthDto } from '@two-factor-auth/dto/create-two-factor-auth-dto';
import { UpdateTwoFactorAuthDto } from '@two-factor-auth/dto/update-two-factor-auth-dto';
import { IdValidationDto } from '@shared/validators/id-validation-dto';

@ApiTags('Two Factor Auth')
@Controller({ path: 'two-factor-auth', version: '1' })
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @Post()
  async create(
    @Body() createTwoFactorAuthDto: CreateTwoFactorAuthDto,
  ): Promise<TwoFactorAuth> {
    return this.twoFactorAuthService.create(createTwoFactorAuthDto);
  }

  @Get()
  async findAll(): Promise<TwoFactorAuth[]> {
    return this.twoFactorAuthService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<TwoFactorAuth> {
    return this.twoFactorAuthService.findOne(idValidationDto.id);
  }

  @Patch(':id')
  async update(
    @Param() idValidationDto: IdValidationDto,
    @Body() updateTwoFactorAuthDto: UpdateTwoFactorAuthDto,
  ): Promise<TwoFactorAuth> {
    return this.twoFactorAuthService.update(
      idValidationDto.id,
      updateTwoFactorAuthDto,
    );
  }

  @Delete(':id')
  async remove(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<TwoFactorAuth> {
    return this.twoFactorAuthService.remove(idValidationDto.id);
  }
}
