import { Inject, Injectable } from "@nestjs/common";
import { BookRepository, bookRepositoryKey } from "../domain/book.repository";
import { PrismaService } from "src/cores/prisma/prisma.service";
import { Book, BookCreateCommand, BookUpdateCommand } from "../domain/book.model";


@Injectable()
export class BookPrismaRepository implements BookRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  getAllBooks(): Promise<Book[]> {
    throw new Error("Method not implemented.");
  }
  getBookById(id: Book["id"]): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  createBook(book: BookCreateCommand): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  updateBook(book: BookUpdateCommand): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  deleteBook(id: Book["id"]): Promise<Book> {
    throw new Error("Method not implemented.");
  }

}