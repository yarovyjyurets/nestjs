import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-config';
import { Users } from './db/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    this.config = config;
  }

  async findAll() {
    console.dir(this.config.get('database'), { colors: true, depth: 5 });
    return this.usersRepository.find();
  }
}
