import { Module } from '@nestjs/common';

import { AccountPreferencesModule } from '@accountPreferences/account-preferences.module';
import { SharedModule } from '@shared/shared.module';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';

@Module({
  imports: [SharedModule, AccountPreferencesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
