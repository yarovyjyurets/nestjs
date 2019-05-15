import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  @ApiBearerAuth()
  @Get('')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return 'Year u got protected route';
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}
