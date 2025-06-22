import { Inject, Injectable } from "@nestjs/common";
import { BookRepository, bookRepositoryKey } from "../domain/book.repository";
import { BookCreateCommand, BookUpdateCommand } from "./book.model";


@Injectable()
export class BookUseCase {

  constructor(
    @Inject(bookRepositoryKey)
    private readonly repository: BookRepository
  ) { }

  async getAllBooks() {
    return this.repository.getAllBooks();
  }

  async getBookById(id: number) {
    return this.repository.getBookById(id);
  }

  async createBook(book: BookCreateCommand) {
    return this.repository.createBook(book);
  }

  async updateBook(book: BookUpdateCommand) {
    return this.repository.updateBook(book);
  }

  async deleteBook(id: number) {
    return this.repository.deleteBook(id);
  }
}