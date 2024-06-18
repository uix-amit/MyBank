import { Module } from '@nestjs/common';

import { AccountsModule } from '@accounts/accounts.module';
import { CardsModule } from '@cards/cards.module';
import { LoansModule } from '@loans/loans.module';
import { SettingsModule } from '@settings/settings.module';
import { PrismaService } from '@sharedServices/prisma/prisma.service';
import { TransactionsModule } from '@transactions/transactions.module';
import { UsersModule } from '@users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TransactionsModule,
    AccountsModule,
    CardsModule,
    LoansModule,
    SettingsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
