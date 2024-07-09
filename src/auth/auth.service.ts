import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TwoFactorAuth, Users } from '@prisma/client';
import ejs from 'ejs';
import path from 'path';

import { MailerService } from '@shared/services/mailer/mailer.service';
import { TwoFactorAuthService } from '@two-factor-auth/two-factor-auth.service';
import { UsersService } from '@users/users.service';
import { differenceInMinutes } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.Password === password) {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }

  async sendOtp(user: Omit<Users, 'Password'>): Promise<any> {
    try {
      const otpCode: number = Math.floor(100000 + Math.random() * 900000);
      const filePath = path.join(__dirname, '../email-templates', 'otp.ejs');

      const html = await ejs.renderFile(filePath, { otpCode });
      this.mailerService.sendEmail({
        from: this.configService.get<string>('NODEMAILER_USER'),
        to: user.Email,
        subject: `Welcome Back! Confirm Your Identity with MyBank`,
        html,
      });
      await this.twoFactorAuthService.removeByUserID(user.UserID);
      const twoFactorAuthRecord = await this.twoFactorAuthService.create({
        Otp: otpCode,
        UserID: user.UserID,
      });
      return { id: twoFactorAuthRecord.TwoFactorAuthID };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateOtp(id: string, otp: number) {
    const twoFactorAuthRecord: TwoFactorAuth =
      await this.twoFactorAuthService.findOne(id);
    const isTimeLimitExeeded: boolean =
      differenceInMinutes(new Date(), new Date(twoFactorAuthRecord.CreatedAt)) >
      this.configService.get<number>('OTP_VALIDITY');
    if (twoFactorAuthRecord.Otp === otp && !isTimeLimitExeeded) {
      this.twoFactorAuthService.remove(twoFactorAuthRecord.TwoFactorAuthID);
      return twoFactorAuthRecord.UserID;
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(id: string) {
    const user = await this.usersService.findOne(id);
    const payload = { username: user.UserName, sub: user.UserID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
