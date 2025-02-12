import { Injectable } from '@nestjs/common';
import { Notifications, Prisma } from '@prisma/client';

import { PrismaService } from '@shared/services/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createNotificationDto: Prisma.NotificationsUncheckedCreateInput,
  ): Promise<Notifications> {
    return await this.prismaService.notifications.create({
      data: createNotificationDto,
    });
  }

  async findAll(UserID: string, filters?: any): Promise<Notifications[]> {
    return await this.prismaService.notifications.findMany({
      where: { UserID, IsRead: filters?.IsRead },
      orderBy: {
        CreatedAt: 'desc',
      },
    });
  }

  async findOne(NotificationID: string): Promise<Notifications> {
    return await this.prismaService.notifications.findFirst({
      where: { NotificationID },
    });
  }

  async update(
    NotificationID: string,
    updateNotificationDto: Prisma.NotificationsUncheckedUpdateInput,
  ): Promise<Notifications> {
    return await this.prismaService.notifications.update({
      where: { NotificationID },
      data: updateNotificationDto,
    });
  }

  async toggleRead(
    UserID: string,
    NotificationIDs: string[],
    IsRead: boolean = true,
  ): Promise<Prisma.BatchPayload> {
    return await this.prismaService.notifications.updateMany({
      where: {
        UserID,
        NotificationID: {
          in: NotificationIDs,
        },
      },
      data: {
        IsRead,
      },
    });
  }

  async remove(NotificationID: string): Promise<Notifications> {
    return await this.prismaService.notifications.delete({
      where: { NotificationID },
    });
  }
}
