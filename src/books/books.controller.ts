import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, Params } from './dto';
import { HttpExceptionFilter, AllExceptionsFilter } from '../middlewares/books.filter';

// @UseFilters(new HttpExceptionFilter())
@UseFilters(new AllExceptionsFilter(), new HttpExceptionFilter())
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  getAllBooks(): Promise<any[]> {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
      info: 'asdasd',
    }, HttpStatus.BAD_REQUEST)
    // throw new Error('asdasad');
    return this.booksService.getAll();
  }

  @HttpCode(202)
  @Get(':id')
  async getBook(@Param('id') bookId: string) {
    const book = await this.booksService.getById(bookId);
    return book;
    // res.status(200).send(book);
  }


  @Delete(':id')
  deleteBook(@Param('id') bookId: string): Promise<object> {
    return this.booksService.deleteById(bookId);
  }

  @Post()
  addBook(@Body() book: CreateBookDto): Promise<object> {
    return this.booksService.addBook(book);
  }
}
