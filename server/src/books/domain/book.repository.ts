import { Book, BookCreateCommand, BookUpdateCommand } from "./book.model";


// Assign a unique symbol to the repository key for dependency injection
const bookRepositorySymbol = Symbol('BookRepository');
export const bookRepositoryKey = bookRepositorySymbol.toString();

export interface BookRepository {
  getAllBooks(): Promise<Book[]>;
  getBookById(id: Book["id"]): Promise<Book>;
  createBook(book: BookCreateCommand): Promise<Book>;
  updateBook(book: BookUpdateCommand): Promise<Book>;
  deleteBook(id: Book["id"]): Promise<Book>;
}