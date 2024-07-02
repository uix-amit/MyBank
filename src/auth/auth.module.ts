import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthService } from '@auth/auth.service';
import { LocalStrategyService } from '@auth/local-strategy/local-strategy.service';
import { UsersModule } from '@users/users.module';
import { JwtStrategyService } from '@auth/jwt-strategy/jwt-strategy.service';
import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';

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
