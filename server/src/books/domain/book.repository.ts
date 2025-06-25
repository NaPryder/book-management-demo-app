import { IBook, BookCreateCommand, BookUpdateCommand, BookQueryParams, BookListRepositoryResult } from "./book.model";


// Assign a unique symbol to the repository key for dependency injection
const bookRepositorySymbol = Symbol('BookRepository');
export const bookRepositoryKey = bookRepositorySymbol.toString();

export interface BookRepository {
  getAllBooks(page: number, perPage: number, search: string): Promise<BookListRepositoryResult>;
  getBookById(id: IBook["id"]): Promise<IBook | null>;
  createBook(book: BookCreateCommand): Promise<IBook>;
  updateBook(book: BookUpdateCommand): Promise<IBook>;
  deleteBook(id: IBook["id"]): Promise<IBook>;
}