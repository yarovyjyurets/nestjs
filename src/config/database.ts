import { join } from 'path';

export default {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'mc',
  port: 3306,
  logging: true,
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
};
