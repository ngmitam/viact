import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import mockUsersService from '../mock/UserService.mock';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET_KEY || 'secretKey',
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
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser should return user', async () => {
    const result = await service.validateUser('existingUser', 'password');
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email');
  });

  it('validateUser should return null', async () => {
    const result = await service.validateUser('nonExistingUser', 'password');
    expect(result).toBeNull();
  });

  it('validateUser should return error message', async () => {
    const result = await service.validateUser('existingUser', 'wrongPassword');
    expect(result).toHaveProperty('error');
    expect(result).toHaveProperty('error_message');
  });

  it('login should return access_token', async () => {
    const result = await service.login('existingUser', 'password');
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('access_token');
  });

  it('login should throw error', async () => {
    expect(service.login('nonExistingUser', 'password')).rejects.toThrow(
      'Your account is not existing',
    );
  });
});
