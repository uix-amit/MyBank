import { Module } from '@nestjs/common';

import { NotificationsService } from '../notifications/notifications.service';
import { PasswordService } from './password/password.service';
import { MailerService } from './services/mailer/mailer.service';
import { PrismaService } from './services/prisma/prisma.service';
import { IdValidationDto } from './validators/id-validation-dto';

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
