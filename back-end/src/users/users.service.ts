import { Inject, Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { env } from 'process';

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

  create(
    email: string,
    password: string,
  ): Promise<{
    result: boolean;
    message?: string;
  }> {
    if (!email || !password) {
      return Promise.resolve({
        result: false,
        message: 'Email and password are required',
      });
    }

    return this.findOneByEmail(email)
      .then((user) => {
        if (user) {
          return {
            result: false,
            message: 'User already exists',
          };
        }

        const saltOrRounds = env.SALT_ROUNDS ?? 10;
        const hash = bcrypt.hashSync(password, saltOrRounds);

        return this.usersRepo
          .save({
            email,
            password: hash,
          })
          .then(() => {
            return {
              result: true,
            };
          });
      })
      .catch(() => {
        return {
          result: false,
          message: 'Something went wrong',
        };
      });
  }
}
