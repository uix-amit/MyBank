import { Module } from '@nestjs/common';

import { AccountPreferencesService } from './account-preferences.service';
import { AccountPreferencesController } from './account-preferences.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [AccountPreferencesController],
  providers: [AccountPreferencesService],
  exports: [AccountPreferencesService],
})
export class AccountPreferencesModule {}
