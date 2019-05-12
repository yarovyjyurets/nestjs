import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get('token')
  async createToken(): Promise<any> {
    return await 'this.authService.createToken()';
  }
  
  @ApiBearerAuth()
  @Get('data')
  @UseGuards(AuthGuard('bearer'))
  findAll() {
    return 'Year u got protected route'
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}
