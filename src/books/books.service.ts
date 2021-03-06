import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from './mocks/books';
import { Book } from './interfaces/book';

@Injectable()
export class BooksService {
  books: Book[] = BOOKS;

  async getAll(): Promise<any> {
    return this.books;
  }

  async getById(id: string): Promise<object> {
    const searchableId = Number(id);
    const foundItem = this.books.find(i => i.id === searchableId);
    if (!foundItem) {
      throw new HttpException('Book does not exist!', 404);
    }

    return foundItem;
  }

  async deleteById(bookID: string): Promise<object> {
    const id = Number(bookID);
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) {
      throw new HttpException('Book does not exist!', 404);
    }
    const [deletedBook] = this.books.splice(index, 1);

    return deletedBook;
  }

  async addBook(newNook: Book): Promise<Book> {
    const bookId = Number(newNook.id);
    const index = this.books.findIndex(storedook => storedook.id === bookId);
    if (index === -1) {
      this.books.push(newNook);

      return newNook;
    }

    throw new HttpException('Book already exists!', 409);
  }
}
