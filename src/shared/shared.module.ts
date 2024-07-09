import { Module } from '@nestjs/common';
import { PrismaService } from '@sharedServices/prisma/prisma.service';
import { IdValidationDto } from '@sharedValidators/id-validation-dto';
import { MailerService } from './services/mailer/mailer.service';

@Module({
  imports: [IdValidationDto],
  providers: [PrismaService, MailerService],
  exports: [PrismaService, IdValidationDto, MailerService],
})
export class SharedModule {}
