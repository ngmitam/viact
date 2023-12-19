import { Inject, Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepo: Repository<UsersEntity>,
  ) {}

  hideCredentials(user: UsersEntity): UsersEntity {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user; // remove password,
    return result;
  }

  findOneByEmail(email: string): Promise<UsersEntity | null> {
    return this.usersRepo.findOne({
      where: [{ email }, { username: email }],
    });
  }

  findOneById(id: string): Promise<UsersEntity | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  verifyPassword(
    password: string,
    hash: string | null | undefined,
  ): Promise<boolean> {
    if (!hash) return Promise.resolve(false);
    return bcrypt.compare(password, hash);
  }
}
