import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


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