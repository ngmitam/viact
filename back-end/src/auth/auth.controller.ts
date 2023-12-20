import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }): Promise<{
    result: true;
    data: {
      access_token: string;
    };
  }> {
    return await this.authService.login(body.email?.trim(), body.password);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }): Promise<{
    result: boolean;
    message?: string;
  }> {
    return await this.authService.register(body.email?.trim(), body.password);
  }
}
