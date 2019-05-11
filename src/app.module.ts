import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { logger } from './middlewares/logger';
import { LoggerMiddlewareForBooks } from './middlewares/books';
import { BooksController } from './books/books.controller';

@Module({
  imports: [BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes('*')
      // .apply(LoggerMiddlewareForBooks)
      // .forRoutes(BooksController);
  }
}