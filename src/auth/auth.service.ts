import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';

import { UsersService } from '@users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

  async login(user: Omit<Users, 'Password'>) {
    const payload = { username: user.UserName, sub: user.UserID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
