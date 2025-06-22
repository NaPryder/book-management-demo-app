import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './cores/prisma/prisma.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationExceptionFilter } from './cores/filters/validation-exception.filter';
import { EnvironmentConfigModule } from './cores/environment/environment.module';
import { BookModule } from './books/book.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    BookModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      /**
       * Allowing to do validation through DTO
       * since class-validator library default throw BadRequestException, here we use exceptionFactory to throw
       * their internal exception so that filter can recognize it
       */
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        }),
    },
  ],
})
export class AppModule { }
