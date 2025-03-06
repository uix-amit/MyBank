import { Module } from '@nestjs/common';

import { AccountPreferencesModule } from '../account-preferences/account-preferences.module';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SharedModule, AccountPreferencesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
