import { BadRequestException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException(
        'Email you are trying with is alread in user',
      );
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(salt, password, 32)) as Buffer;
    const pwd = salt + '.' + hash.toString('hex');
  }
}
