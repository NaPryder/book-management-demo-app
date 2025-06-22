import { Controller, Get, Param } from "@nestjs/common";
import { BookUseCase } from "../domain/book.usecases";


@Controller({ version: "1" })
export class BookController {

  constructor(
    private readonly usecase: BookUseCase,
  ) { }

  @Get("books")
  async getAllBooks() {
    // this.usecase.getAllBooks()
    return "List of all books";
  }

  @Get("books/:id")
  async getBookById(
    @Param("id") id: string,
  ) {
    return "Details of a specific book";
  }

  @Get("books/create")
  async createBook() {
    return "Create a new book";
  }

  @Get("books/update/:id")
  async updateBook() {
    return "Update a specific book";
  }

  @Get("books/delete/:id")
  async deleteBook() {
    return "Delete a specific book";
  }

}