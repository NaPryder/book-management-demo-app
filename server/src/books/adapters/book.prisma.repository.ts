import { Inject, Injectable } from "@nestjs/common";
import { BookRepository, bookRepositoryKey } from "../domain/book.repository";
import { PrismaService } from "src/cores/prisma/prisma.service";
import { IBook, BookCreateCommand, BookUpdateCommand, BookQueryParams, BookListResult, BookListRepositoryResult } from "../domain/book.model";
import { Books } from "generated/prisma";


@Injectable()
export class BookPrismaRepository implements BookRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  toBookModel(book: Books): IBook {
    return {
      id: book.bookId,
      title: book.title,
      author: book.author,
      genre: book.genre ?? undefined,
      publishedYear: book.publishedYear ?? undefined,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    }
  }
  async getAllBooks(page: number, perPage: number, search: string): Promise<BookListRepositoryResult> {

    const [count, books] = await this.prisma.$transaction([
      this.prisma.books.count(),
      this.prisma.books.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: perPage,
        skip: page * perPage,
        ...(search.length > 0
          ? {
            where: {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: "insensitive",
                  }
                },
              ]
            }
          }
          : {}
        )

      }),
    ])

    if (books.length === 0) {
      return {
        data: [],
        total: 0,
      }
    }

    return {
      data: books.map(this.toBookModel.bind(this)),
      total: count,
    }
  }

  async getBookById(id: IBook["id"]): Promise<IBook | null> {
    const book = await this.prisma.books.findUnique({
      where: {
        bookId: id,
      }
    })
    if (!book) {
      return null;
    }
    return this.toBookModel(book)
  }
  async createBook(book: BookCreateCommand): Promise<IBook> {
    const createdBook = await this.prisma.books.create({
      data: {
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedYear: book.publishedYear,
      },
    })
    return this.toBookModel(createdBook);
  }
  async updateBook(book: BookUpdateCommand): Promise<IBook> {
    const updatedBook = await this.prisma.books.update({
      where: {
        bookId: book.id,
      },
      data: {
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedYear: book.publishedYear,
      },
    })

    return this.toBookModel(updatedBook);


  }
  async deleteBook(id: IBook["id"]): Promise<IBook> {
    const deletedBook = await this.prisma.books.delete({
      where: {
        bookId: id,
      }
    })
    return this.toBookModel(deletedBook);
  }
}