import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { AccountPreferencesController } from './account-preferences.controller';
import { AccountPreferencesService } from './account-preferences.service';

@Module({
  imports: [SharedModule],
  controllers: [AccountPreferencesController],
  providers: [AccountPreferencesService],
  exports: [AccountPreferencesService],
})
export class AccountPreferencesModule {}
