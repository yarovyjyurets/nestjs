import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(userCredentions: JwtPayload): Promise<string> {
    console.log('>>>>>userCredentions', userCredentions);
    return this.jwtService.sign(userCredentions);
  }
}
