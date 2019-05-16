import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth()
  @Get('')
  // @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.findAll();
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}
