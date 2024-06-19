import { Module } from '@nestjs/common';

import { LoansService } from '@loans/loans.service';
import { LoansController } from '@loans/loans.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
