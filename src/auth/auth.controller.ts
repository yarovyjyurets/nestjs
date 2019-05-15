import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogin } from '../users/dto/user-login.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async createToken(@Body() userLogin: UserLogin): Promise<any> {
    return this.authService.login(userLogin);
  }
}
