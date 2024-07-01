import { Module } from '@nestjs/common';
import { PrismaService } from '@sharedServices/prisma/prisma.service';
import { IdValidationDto } from '@sharedValidators/id-validation-dto';

@Module({
  imports: [IdValidationDto],
  providers: [PrismaService],
  exports: [PrismaService, IdValidationDto],
})
export class SharedModule {}
