import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { BookRepository, bookRepositoryKey } from "../domain/book.repository";
import { BookCreateCommand, BookListResult, BookQueryParams, BookUpdateCommand, IBook } from "./book.model";


@Injectable()
export class BookUseCase {

  constructor(
    @Inject(bookRepositoryKey)
    private readonly repository: BookRepository
  ) { }

  async getAllBooks(params: BookQueryParams): Promise<BookListResult> {
    return await this.repository.getAllBooks(params);
  }

  async getBookById(id: IBook["id"]) {
    return await this.repository.getBookById(id);
  }

  async createBook(book: BookCreateCommand) {
    return await this.repository.createBook(book);
  }

  async updateBook(book: BookUpdateCommand) {
    if (!await this.repository.getBookById(book.id)) {
      throw new BadRequestException(`Invalid book id (${book.id})`);
    }

    return await this.repository.updateBook(book);
  }

  async deleteBook(id: IBook["id"]) {
    if (!await this.repository.getBookById(id)) {
      throw new BadRequestException(`Invalid book id (${id})`);
    }

    return await this.repository.deleteBook(id);
  }
}