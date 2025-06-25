
import { mock } from 'jest-mock-extended';
import { BookRepository } from './book.repository';
import { BookCreateCommand, BookListResult, BookQueryParams, BookUpdateCommand, IBook } from './book.model';
import { Builder } from 'builder-pattern';
import { fa, faker } from '@faker-js/faker/.';
import { BookUseCase } from './book.usecases';
import { BadRequestException } from '@nestjs/common';

describe('BookUsecases', () => {

  const repository = mock<BookRepository>()

  function getFakeBook(id?: string): IBook {
    let fakeId = id ?? faker.string.uuid();

    return Builder<IBook>()
      .id(fakeId)
      .title(faker.book.title())
      .author(faker.book.author())
      .genre(faker.book.genre())
      .publishedYear(faker.date.past().getFullYear())
      .createdAt(faker.date.past())
      .updatedAt(faker.date.recent())
      .build();
  }

  describe('getAllBooks', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    })

    it('should return a list of books (page 0) should be same as page 1', async () => {
      const params: BookQueryParams = {
        page: 0,
        perPage: 3,
        search: ''
      }
      const mockRepositoryResult = {
        data: [
          getFakeBook(),
          getFakeBook(),
          getFakeBook()
        ],
        total: 20,
      }
      const mockBooks: BookListResult = {
        data: mockRepositoryResult.data,
        metaData: {
          size: 3,
          total: 20,
          page: 0,
          perPage: 3,
          hasNextPage: true,
        }
      };

      repository.getAllBooks.mockResolvedValue(mockRepositoryResult);

      const usecase = new BookUseCase(repository)

      const actual = await usecase.getAllBooks(params);

      expect(actual).toEqual(mockBooks);
      expect(repository.getAllBooks).toHaveBeenCalledWith(0, 3, '');
    });

    it('should return a list of books (page 1)', async () => {
      const params: BookQueryParams = {
        page: 1,
        perPage: 3,
      }
      const mockRepositoryResult = {
        data: [
          getFakeBook(),
          getFakeBook(),
          getFakeBook()
        ],
        total: 20,
      }
      const mockBooks: BookListResult = {
        data: mockRepositoryResult.data,
        metaData: {
          size: 3,
          total: 20,
          page: 1,
          perPage: 3,
          hasNextPage: true,
        }
      };

      repository.getAllBooks.mockResolvedValue(mockRepositoryResult);

      const usecase = new BookUseCase(repository)

      const actual = await usecase.getAllBooks(params);

      expect(actual).toEqual(mockBooks);
      expect(repository.getAllBooks).toHaveBeenCalledWith(
        1,
        3,
        '',
      );
    });

    it('should return a list of books (invalid page )', async () => {
      const params: BookQueryParams = {
        page: -1,
        perPage: 3,
      }
      const mockLastCursor = faker.string.uuid();
      const mockRepositoryResult = {
        data: [
          getFakeBook(),
          getFakeBook(),
          getFakeBook(mockLastCursor)
        ],
        total: 20,
      }

      const usecase = new BookUseCase(repository)

      await expect(usecase.getAllBooks(params)).rejects.toThrow(
        new BadRequestException(`Invalid page number (${params.page})`)
      );


    });
  })

  describe('getBookById', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    })

    it('should return a book by id', async () => {
      const fakeId = faker.string.uuid();
      const expectedBook = getFakeBook(fakeId);

      repository.getBookById.mockResolvedValue(expectedBook);

      const usecase = new BookUseCase(repository)

      const actual = await usecase.getBookById(fakeId);
      expect(repository.getBookById).toHaveBeenCalledWith(fakeId);
      expect(actual).toEqual(expectedBook);
    })

    it('should return null if book not found', async () => {
      const fakeId = faker.string.uuid();

      repository.getBookById.mockResolvedValue(null);

      const usecase = new BookUseCase(repository)


      await expect(usecase.getBookById(fakeId)).rejects.toThrow(
        new BadRequestException(`Invalid book id (${fakeId})`)
      );

      expect(repository.getBookById).toHaveBeenCalledWith(fakeId);
    })
  })

  describe('createBook', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    })

    it('should create a book', async () => {
      const command = Builder<BookCreateCommand>()
        .title(faker.book.title())
        .author(faker.book.author())
        .genre(faker.book.genre())
        .publishedYear(faker.date.past().getFullYear())
        .build();

      const expectedBook = Builder<IBook>()
        .id(faker.string.uuid())
        .title(command.title)
        .author(command.author)
        .genre(command.genre)
        .publishedYear(command.publishedYear)
        .createdAt(new Date())
        .updatedAt(new Date())
        .build();

      repository.createBook.mockResolvedValue(expectedBook);

      const usecase = new BookUseCase(repository)

      const actual = await usecase.createBook(command);
      expect(repository.createBook).toHaveBeenCalledWith(command);
      expect(actual).toEqual(expectedBook);
    })
  })

  describe('updateBook', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    })

    it('should update a book', async () => {
      const fakeId = faker.string.uuid();

      const command = Builder<BookUpdateCommand>()
        .id(fakeId)
        .title(faker.book.title())
        .author(faker.book.author())
        .genre(faker.book.genre())
        .publishedYear(faker.date.past().getFullYear())
        .build();

      const expectedBook = Builder<IBook>()
        .id(fakeId)
        .title(command.title)
        .author(command.author)
        .genre(command.genre)
        .publishedYear(command.publishedYear)
        .createdAt(faker.date.past())
        .updatedAt(new Date())
        .build();

      repository.getBookById.mockResolvedValue(getFakeBook(fakeId));
      repository.updateBook.mockResolvedValue(expectedBook);

      const usecase = new BookUseCase(repository)

      const actual = await usecase.updateBook(command);

      expect(repository.getBookById).toHaveBeenCalledWith(fakeId);
      expect(repository.updateBook).toHaveBeenCalledWith(command);
      expect(actual).toEqual(expectedBook);
    })

    it('should throw BadRequestException if book not found', async () => {
      const fakeId = faker.string.uuid();

      const command = Builder<BookUpdateCommand>()
        .id(fakeId)
        .title(faker.book.title())
        .author(faker.book.author())
        .genre(faker.book.genre())
        .publishedYear(faker.date.past().getFullYear())
        .build();

      repository.getBookById.mockResolvedValue(null);

      const usecase = new BookUseCase(repository)

      await expect(usecase.updateBook(command)).rejects.toThrow(
        new BadRequestException(`Invalid book id (${fakeId})`)
      );

      expect(repository.getBookById).toHaveBeenCalledWith(fakeId);
      expect(repository.updateBook).not.toHaveBeenCalled();
    })
  })


  describe('deleteBook', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    })

    it('should delete a book', async () => {
      const fakeId = faker.string.uuid();

      const deletingBook = getFakeBook(fakeId);

      repository.getBookById.mockResolvedValue(deletingBook);
      repository.deleteBook.mockResolvedValue(deletingBook);

      const usecase = new BookUseCase(repository)

      const actual = await usecase.deleteBook(fakeId);

      expect(repository.getBookById).toHaveBeenCalledWith(fakeId);
      expect(repository.deleteBook).toHaveBeenCalledWith(fakeId);
      expect(actual).toEqual(deletingBook);
    })

    it('should throw BadRequestException if book not found', async () => {
      const fakeId = faker.string.uuid();

      repository.getBookById.mockResolvedValue(null);

      const usecase = new BookUseCase(repository)

      await expect(usecase.deleteBook(fakeId)).rejects.toThrow(
        new BadRequestException(`Invalid book id (${fakeId})`)
      );

      expect(repository.getBookById).toHaveBeenCalledWith(fakeId);
      expect(repository.deleteBook).not.toHaveBeenCalled();
    })
  })




})
