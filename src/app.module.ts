import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';
import { CardsModule } from './cards/cards.module';
import { LoansModule } from './loans/loans.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TransactionsModule, AccountsModule, CardsModule, LoansModule, SettingsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
