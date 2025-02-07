import { Module } from '@nestjs/common';

import { NotificationsService } from '@notifications/notifications.service';
import { MailerService } from '@sharedServices/mailer/mailer.service';
import { PrismaService } from '@sharedServices/prisma/prisma.service';
import { IdValidationDto } from '@sharedValidators/id-validation-dto';
import { PasswordService } from './password/password.service';

@Module({
  imports: [IdValidationDto],
  providers: [
    PrismaService,
    MailerService,
    NotificationsService,
    PasswordService,
  ],
  exports: [
    PrismaService,
    IdValidationDto,
    MailerService,
    NotificationsService,
    PasswordService,
  ],
})
export class SharedModule {}
