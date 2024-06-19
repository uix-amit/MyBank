import { Module } from '@nestjs/common';

import { SettingsService } from '@settings/settings.service';
import { SettingsController } from '@settings/settings.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
