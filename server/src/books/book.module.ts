import { Module } from "@nestjs/common";
import { BookController } from "./adapters/book.controllers";
import { BookUseCase } from "./domain/book.usecases";
import { bookRepositoryKey } from "./domain/book.repository";
import { BookPrismaRepository } from "./adapters/book.prisma.repository";
import { PrismaService } from "src/cores/prisma/prisma.service";

@Module({
  imports: [],
  controllers: [
    BookController,
  ],
  providers: [
    PrismaService,
    BookUseCase,
    {
      provide: bookRepositoryKey,
      useClass: BookPrismaRepository,
    }
  ],
  exports: [],
})
export class BookModule { }