import { Module } from '@nestjs/common';

import { UsersService } from '@users/users.service';
import { UsersController } from '@users/users.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
