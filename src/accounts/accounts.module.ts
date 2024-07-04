import { Module } from '@nestjs/common';

import { AccountsController } from '@accounts/accounts.controller';
import { AccountsService } from '@accounts/accounts.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
