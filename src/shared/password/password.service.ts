import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, parseInt(process.env.SALTROUNDS, 10));
  }

  async comparePasswords(
    plaintextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plaintextPassword, hashedPassword);
  }
}
