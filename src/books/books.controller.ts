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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/dto.book';
import { HttpExceptionFilter, AllExceptionsFilter } from '../middlewares/books.filter';

import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from './pipes/books.pipe';
import { bookSchema } from './pipes/book.schema';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('boooks')

@Controller('books')
@UseFilters(AllExceptionsFilter, HttpExceptionFilter)
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  getAllBooks(): Promise<any[]> {
    // throw new Error('asdasad');
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message',
    //   info: 'asdasd',
    // }, HttpStatus.BAD_REQUEST)
    return this.booksService.getAll();
  }

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
  @UsePipes(new ValidationPipe(bookSchema))
  addBook(@Body() book: CreateBookDto): Promise<object> {
    return this.booksService.addBook(book);
  }
}
