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
import { AccountPreferences } from '@prisma/client';

import { AccountPreferencesService } from '@accountPreferences/account-preferences.service';
import { CreateAccountPreferencesDto } from '@accountPreferences/dto/create-account-preferences-dto';
import { UpdateAccountPreferencesDto } from '@accountPreferences/dto/update-account-preferences-dto';

@ApiTags('Account Preferences')
@Controller({ path: 'account-preferences', version: '1' })
export class AccountPreferencesController {
  constructor(
    private readonly accountPreferencesService: AccountPreferencesService,
  ) {}

  @Post()
  async create(
    @Body() createAccountPreferenceDto: CreateAccountPreferencesDto,
  ): Promise<AccountPreferences> {
    return this.accountPreferencesService.create(createAccountPreferenceDto);
  }

  @Get()
  async findAll(): Promise<AccountPreferences[]> {
    return this.accountPreferencesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AccountPreferences> {
    return this.accountPreferencesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountPreferenceDto: UpdateAccountPreferencesDto,
  ): Promise<AccountPreferences> {
    return this.accountPreferencesService.update(
      id,
      updateAccountPreferenceDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<AccountPreferences> {
    return this.accountPreferencesService.remove(id);
  }
}
