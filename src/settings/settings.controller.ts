import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountPreference, Prisma } from '@prisma/client';

import { SettingsService } from '@settings/settings.service';

@Controller({ path: 'settings', version: '1' })
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  async create(
    @Body() createSettingDto: Prisma.AccountPreferenceCreateInput,
  ): Promise<AccountPreference> {
    return this.settingsService.create(createSettingDto);
  }

  @Get()
  async findAll(): Promise<AccountPreference[]> {
    return this.settingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AccountPreference> {
    return this.settingsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSettingDto: Prisma.AccountPreferenceUpdateInput,
  ): Promise<AccountPreference> {
    return this.settingsService.update(id, updateSettingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<AccountPreference> {
    return this.settingsService.remove(id);
  }
}
