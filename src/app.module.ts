import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

import { AccountPreferencesModule } from './account-preferences/account-preferences.module';
import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BraintreeModule } from './braintree/braintree.module';
import { CardsModule } from './cards/cards.module';
import { LoanTransactionsModule } from './loan-transactions/loan-transactions.module';
import { LoansModule } from './loans/loans.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SharedModule } from './shared/shared.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TwoFactorAuthModule } from './two-factor-auth/two-factor-auth.module';
import { UsersModule } from './users/users.module';

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
        limit: parseInt(process.env.THROTTLE_LIMIT),
      },
    ]),
    SharedModule,
    NotificationsModule,
    TwoFactorAuthModule,
    AccountPreferencesModule,
    LoggerModule.forRoot(),
    AuthModule,
    LoanTransactionsModule,
    BraintreeModule,
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
