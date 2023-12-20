import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<null | { error: string; error_message: string } | any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    if (pass && (await this.usersService.verifyPassword(pass, user.password)))
      return this.usersService.hideCredentials(user);

    return {
      error: 'wrong password',
      error_message:
        'Wrong password, please try again or sign up a new account',
    };
  }

  async login(
    email: string,
    pass: string,
  ): Promise<{
    result: true;
    data: {
      access_token: string;
    };
  }> {
    const user = await this.validateUser(email, pass);
    if (user) {
      if (user.error) {
        throw new HttpException(user.error_message, HttpStatus.UNAUTHORIZED);
      }

      return {
        result: true,
        data: {
          access_token: this.jwtService.sign({ id: user.id }),
        },
      };
    }
    throw new HttpException(
      'Your account is not existing',
      HttpStatus.UNAUTHORIZED,
    );
  }

  register(
    email: string,
    password: string,
  ): Promise<{
    result: boolean;
    message?: string;
  }> {
    return this.usersService.create(email, password);
  }
}
