import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  getAllBooks(): Promise<any[]> {
    return this.booksService.getAll();
  }

  @Get(':id')
  getBook(@Param('id') bookId): Promise<object> {
    return this.booksService.getById(bookId);
  }
  
  @Delete(':id')
  deleteBook(@Param('id') bookId): Promise<object> {
    return this.booksService.deleteById(bookId);
  }

  @Post()
  addBook(@Body() book): Promise<object> {
    return this.booksService.addBook(book);
  }
}
