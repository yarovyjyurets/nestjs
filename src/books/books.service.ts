import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from './mocks/books'

interface Book {
  id: number,
  title: string,
  description: string,
  author: string,
}

@Injectable()
export class BooksService {
  books = BOOKS;

  async getAll(): Promise<any> {
    return this.books;
  }

  async getById(id: number): Promise<object> {
    const searchableId = Number(id);
    const foundItem = this.books.find(i => i.id === searchableId);
    if (!foundItem) {
      throw new HttpException('Book does not exist!', 404);
    }

    return foundItem;
  }

  async deleteById(bookID: number): Promise<object> {
    const id = Number(bookID);
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) {
      throw new HttpException('Book does not exist!', 404);
    }
    const [deletedBook] = this.books.splice(index, 1);


    return deletedBook;
  }

  async addBook(book: Book): Promise<Book> {
    const bookId = Number(book.id);
    const index = this.books.findIndex(book => book.id === bookId);
    if (index === -1) {
      this.books.push(book);

      return book;
    }

    throw new HttpException('Book already exists!', 409);
  }
}
