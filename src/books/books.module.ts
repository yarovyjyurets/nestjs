import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { LoggerMiddlewareForBooks } from '../middlewares/books';

@Module({
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddlewareForBooks)
      .forRoutes(BooksController);
  }
}
