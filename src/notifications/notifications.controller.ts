import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Notifications } from '@prisma/client';

import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { CreateNotificationDto } from '@notifications/dto/create-notification-dto';
import { UpdateNotificationDto } from '@notifications/dto/update-notification-dto';
import { NotificationsService } from '@notifications/notifications.service';
import { FilterNotificationsDto } from '@shared/classes/filter-notifications-dto';
import { IdValidationDto } from '@shared/validators/id-validation-dto';

@ApiTags('Notifications')
@ApiBearerAuth('Authorization')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@UseGuards(JwtAuthGuard)
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
  async findAll(
    @Request() req: any,
    @Query() query: FilterNotificationsDto,
  ): Promise<Notifications[]> {
    console.log(query);

    return this.notificationsService.findAll(req.user.UserID, query);
  }

  @Get(':id')
  async findOne(
    @Param() idValidationDto: IdValidationDto,
  ): Promise<Notifications> {
    return this.notificationsService.findOne(idValidationDto.id);
  }

  @Patch('/toggle-read')
  async toggleRead(
    @Request() req: any,
    @Body()
    { notificationIds, IsRead }: { notificationIds: string[]; IsRead: boolean },
  ): Promise<Notifications[]> {
    return this.notificationsService.toggleRead(
      req.user.UserID,
      notificationIds,
      IsRead,
    );
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
