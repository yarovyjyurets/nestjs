import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { logger } from './middlewares/logger';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

interface DBCONFIG {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  logging: boolean;
  synchronize: boolean;
}

import { deepStrictEqual } from 'assert';
@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const dbConfig = config.get('database');
        const magicConfig = {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'mc',
          entities: ['src/**/**/*.entity{.ts,.js}'],
          logging: true,
          synchronize: true,
        };
        console.log('>>>AS>AS>', dbConfig)
        // console.log(deepStrictEqual(dbConfig, magicConfig))
        return config.get('database');
      },
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'mc',
    //   entities: ['src/**/*.entity{.ts,.js}'],
    //   logging: true,
    //   synchronize: true,
    // }),
    BooksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // /Users/yurii_yarovyi/Documents/Playground/nestjs/src/**/*.entity{.ts,.js} work
  configure(consumer: MiddlewareConsumer) {
    console.log('>>>>', __dirname + '/**/*.entity{.ts,.js}')
    consumer
      .apply(logger)
      .forRoutes('*');
    // .apply(LoggerMiddlewareForBooks)
    // .forRoutes(BooksController);
  }
}
