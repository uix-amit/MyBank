import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TwoFactorAuth } from '@prisma/client';

import { IsPublic } from '@auth/is-public/is-public.decorator';
import { IdValidationDto } from '@shared/validators/id-validation-dto';
import { CreateTwoFactorAuthDto } from '@two-factor-auth/dto/create-two-factor-auth-dto';
import { UpdateTwoFactorAuthDto } from '@two-factor-auth/dto/update-two-factor-auth-dto';
import { TwoFactorAuthService } from '@two-factor-auth/two-factor-auth.service';

@ApiTags('Two Factor Auth')
@ApiBearerAuth('Authorization')
@Controller({ path: 'two-factor-auth', version: '1' })
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @IsPublic()
  @Post()
  async create(
    @Body() createTwoFactorAuthDto: CreateTwoFactorAuthDto,
  ): Promise<TwoFactorAuth> {
    return this.twoFactorAuthService.create(createTwoFactorAuthDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @Get()
  async findAll(): Promise<TwoFactorAuth[]> {
    return this.twoFactorAuthService.findAll();
  }

  @IsPublic()
  @Get(':id')
  async findOne(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<TwoFactorAuth> {
    return this.twoFactorAuthService.findOne(idValidationDto.id);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
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

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @Delete(':id')
  async remove(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<TwoFactorAuth> {
    return this.twoFactorAuthService.remove(idValidationDto.id);
  }
}
