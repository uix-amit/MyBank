import { Module } from '@nestjs/common';

import { TwoFactorAuthService } from '@two-factor-auth/two-factor-auth.service';
import { TwoFactorAuthController } from '@two-factor-auth/two-factor-auth.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService],
})
export class TwoFactorAuthModule {}
