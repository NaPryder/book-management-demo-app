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
    if (params.page && params.page < 1) {
      throw new BadRequestException(`Invalid page number (${params.page})`);
    }
    const perPage = ((params.perPage && (params.perPage <= 0) ? 20 : params?.perPage)) ?? 20;

    const { data, total } = await this.repository.getAllBooks(
      params.page,
      perPage,
      params?.search ?? ""
    );

    return {
      data,
      metaData: {
        size: data.length,
        total,
        totalPage: Math.ceil(total / perPage),
        page: params.page,
        perPage: perPage,
        hasNextPage: (params.page ?? 1) * (params.perPage ?? 20) < total,
      }
    }
  }

  async getBookById(id: IBook["id"]) {
    const book = await this.repository.getBookById(id);
    if (!book) {
      throw new BadRequestException(`Invalid book id (${id})`);
    }
    return book;
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
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    if (!await this.repository.getBookById(id)) {
      throw new BadRequestException(`Invalid book id (${id})`);
    }
    return await this.repository.deleteBook(id);
  }
}