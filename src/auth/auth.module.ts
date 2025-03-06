import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccountPreferencesModule } from '../account-preferences/account-preferences.module';
import { SharedModule } from '../shared/shared.module';
import { TwoFactorAuthModule } from '../two-factor-auth/two-factor-auth.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { LocalStrategyService } from './local-strategy/local-strategy.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SALT'),
        signOptions: { expiresIn: '30m' },
      }),
    }),
    SharedModule,
    TwoFactorAuthModule,
    AccountPreferencesModule,
  ],
  providers: [
    AuthService,
    LocalStrategyService,
    JwtStrategyService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
