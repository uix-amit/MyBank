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
import { Notifications } from '@prisma/client';

import { NotificationsService } from '@notifications/notifications.service';
import { CreateNotificationDto } from '@notifications/dto/create-notification-dto';
import { UpdateNotificationDto } from '@notifications/dto/update-notification-dto';
import { IdValidationDto } from '@shared/validators/id-validation-dto';

@ApiTags('Notifications')
@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notifications> {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  async findAll(): Promise<Notifications[]> {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<Notifications> {
    return this.notificationsService.findOne(idValidationDto.id);
  }

  @Patch(':id')
  async update(
    @Param() idValidationDto: IdValidationDto,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notifications> {
    return this.notificationsService.update(
      idValidationDto.id,
      updateNotificationDto,
    );
  }

  @Delete(':id')
  async remove(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<Notifications> {
    return this.notificationsService.remove(idValidationDto.id);
  }
}
