import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import mockUsersService from '../mock/UserService.mock';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET_KEY ?? 'secretKey',
          signOptions: { expiresIn: '1w' },
        }),
      ],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        AuthService,
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/api/auth/login (POST) should return access_token', async () => {
    const result = await controller.login({
      email: 'existingUser',
      password: 'password',
    });
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('access_token');
  });

  it('/api/auth/login (POST) should return error message', async () => {
    expect(
      controller.login({
        email: 'nonExistingUser',
        password: 'password',
      }),
    ).rejects.toThrow('Your account is not existing');
  });

  it('/api/auth/login (POST) should return error message', async () => {
    expect(
      controller.login({
        email: 'existingUser',
        password: 'wrongPassword',
      }),
    ).rejects.toThrow(
      'Wrong password, please try again or sign up a new account',
    );
  });

  it('/api/auth/register (POST) should return access_token', async () => {
    const result = await controller.register({
      email: 'newUser',
      password: 'password',
    });
    expect(result).toHaveProperty('result');
    expect(result.result).toBe(true);
  });

  it('/api/auth/register (POST) should return error message', async () => {
    const result = await controller.register({
      email: 'existingUser',
      password: 'password',
    });
    expect(result).toHaveProperty('message');
    expect(result.message).toBe('User already exists');
  });
});
