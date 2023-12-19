import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{
    result: true;
    data: {
      access_token: string;
    };
  }> {
    return await this.authService.login(body.email?.trim(), body.password);
  }
}
