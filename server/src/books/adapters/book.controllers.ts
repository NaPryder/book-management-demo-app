import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BookUseCase } from "../domain/book.usecases";
import { BookCreateDto, BookUpdateDto, PaginationParamsDto } from "./book.dto";
import { BookCreateCommand, BookUpdateCommand } from "../domain/book.model";


@Controller({ version: "1", path: "books" })
export class BookController {

  constructor(
    private readonly usecase: BookUseCase,
  ) { }

  @Get("/")
  async getAllBooks(
    @Query() { limit, cursor }: PaginationParamsDto,
  ) {
    return await this.usecase.getAllBooks({
      limit: limit,
      cursor: cursor,
    })
  }

  @Get("/:id")
  async getBookById(
    @Param("id") id: string,
  ) {
    return await this.usecase.getBookById(id);
  }

  @Post("/")
  async createBook(
    @Body() book: BookCreateDto
  ) {

    const command: BookCreateCommand = {
      title: book.title,
      author: book.author,
      genre: book?.genre ?? "",
      publishedYear: book?.publishedYear ?? 0,
    }
    return await this.usecase.createBook(command);
  }

  @Put("/:id")
  async updateBook(
    @Body() book: BookUpdateDto,
    @Param("id") id: string,
  ) {
    const command: BookUpdateCommand = {
      id,
      title: book?.title,
      author: book?.author,
      genre: book?.genre,
      publishedYear: book?.publishedYear,
    }
    return this.usecase.updateBook(command);
  }

  @Delete(":id")
  async deleteBook(
    @Param("id") id: string,
  ) {
    return this.usecase.deleteBook(id);
  }

}