import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.module';

@Module({
  // imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy],
})
export class AuthModule {}