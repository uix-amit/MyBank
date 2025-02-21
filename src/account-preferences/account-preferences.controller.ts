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
import { AccountPreferences } from '@prisma/client';

import { AccountPreferencesService } from '@accountPreferences/account-preferences.service';
import { CreateAccountPreferencesDto } from '@accountPreferences/dto/create-account-preferences-dto';
import { UpdateAccountPreferencesDto } from '@accountPreferences/dto/update-account-preferences-dto';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { NotificationsService } from '@notifications/notifications.service';
import { IdValidationDto } from '@shared/validators/id-validation-dto';

@ApiTags('Account Preferences')
@ApiBearerAuth('Authorization')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@UseGuards(JwtAuthGuard)
@Controller({ path: 'account-preferences', version: '1' })
export class AccountPreferencesController {
  constructor(
    private readonly accountPreferencesService: AccountPreferencesService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post()
  async create(
    @Body() createAccountPreferenceDto: CreateAccountPreferencesDto,
  ): Promise<AccountPreferences> {
    return this.accountPreferencesService.create(createAccountPreferenceDto);
  }

  @Get()
  async findAll(@Request() req: any): Promise<AccountPreferences> {
    return this.accountPreferencesService.findOneByUserID(req.user.UserID);
  }

  @Get(':id')
  async findOne(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<AccountPreferences> {
    return this.accountPreferencesService.findOne(idValidationDto.id);
  }

  @Patch(':id')
  async update(
    @Request() req: any,
    @Param() idValidationDto: IdValidationDto,
    @Body() updateAccountPreferenceDto: UpdateAccountPreferencesDto,
  ): Promise<{ message: string }> {
    await this.accountPreferencesService.update(idValidationDto.id, {
      ...updateAccountPreferenceDto,
      UserID: req.user.UserID,
      AccountPreferenceID: idValidationDto.id,
    });
    const message: string =
      'Your account preferences have been updated successfully!';
    this.notificationsService.create({
      Message: message,
      UserID: req.user.UserID,
    });
    return { message };
  }

  @Delete(':id')
  async remove(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<AccountPreferences> {
    return this.accountPreferencesService.remove(idValidationDto.id);
  }
}
