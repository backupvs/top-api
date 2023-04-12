import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '../user/user.model';
import * as bcrypt from 'bcrypt';
import { BAD_CREDENTIALS_ERROR } from './auth.constants';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
    const user = await this.userService.findUser(email);

    if (!user) {
      throw new UnauthorizedException(BAD_CREDENTIALS_ERROR);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(BAD_CREDENTIALS_ERROR);
    }

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
