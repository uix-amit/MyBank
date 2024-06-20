import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AccountsModule } from '@accounts/accounts.module';
import { CardsModule } from '@cards/cards.module';
import { LoansModule } from '@loans/loans.module';
import { TransactionsModule } from '@transactions/transactions.module';
import { UsersModule } from '@users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { SharedModule } from './shared/shared.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TwoFactorAuthModule } from './two-factor-auth/two-factor-auth.module';
import { AccountPreferencesModule } from './account-preferences/account-preferences.module';

@Module({
  imports: [
    TransactionsModule,
    AccountsModule,
    CardsModule,
    LoansModule,
    UsersModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000,
        limit: 10,
      },
    ]),
    SharedModule,
    NotificationsModule,
    TwoFactorAuthModule,
    AccountPreferencesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
