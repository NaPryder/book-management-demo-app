import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';


export class BookCreateDto {

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsString()
  readonly genre?: string = "";

  @IsNumber()
  readonly publishedYear?: number = 0;
}


export class BookUpdateDto {
  @IsString()
  readonly title?: string;

  @IsString()
  readonly author?: string;

  @IsString()
  readonly genre?: string;

  @IsNumber()
  readonly publishedYear?: number;
}


export class PaginationParamsDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  perPage?: number = 15;

  @IsOptional()
  @IsString()
  search?: string = "";
}