import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccountPreferencesModule } from '@accountPreferences/account-preferences.module';
import { AuthService } from '@auth/auth.service';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { JwtStrategyService } from '@auth/jwt-strategy/jwt-strategy.service';
import { LocalStrategyService } from '@auth/local-strategy/local-strategy.service';
import { SharedModule } from '@shared/shared.module';
import { TwoFactorAuthModule } from '@two-factor-auth/two-factor-auth.module';
import { UsersModule } from '@users/users.module';

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
