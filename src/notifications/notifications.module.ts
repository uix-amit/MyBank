import { Module } from '@nestjs/common';

import { NotificationsService } from '@notifications/notifications.service';
import { NotificationsController } from '@notifications/notifications.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
