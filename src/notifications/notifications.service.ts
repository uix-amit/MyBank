import { Injectable } from '@nestjs/common';
import { Notifications, Prisma } from '@prisma/client';

import { PrismaService } from '@shared/services/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createNotificationDto: Prisma.NotificationsCreateInput,
  ): Promise<Notifications> {
    return await this.prismaService.notifications.create({
      data: createNotificationDto,
    });
  }

  async findAll(): Promise<Notifications[]> {
    return await this.prismaService.notifications.findMany();
  }

  async findOne(NotificationID: string): Promise<Notifications> {
    return await this.prismaService.notifications.findFirst({
      where: { NotificationID },
    });
  }

  async update(
    NotificationID: string,
    updateNotificationDto: Prisma.NotificationsUpdateInput,
  ): Promise<Notifications> {
    return await this.prismaService.notifications.update({
      where: { NotificationID },
      data: updateNotificationDto,
    });
  }

  async remove(NotificationID: string): Promise<Notifications> {
    return await this.prismaService.notifications.delete({
      where: { NotificationID },
    });
  }
}
