
export interface IBook {
  id: string;
  title: string;
  author: string;
  genre?: string;
  publishedYear?: number;
  createdAt: Date;
  updatedAt: Date;
}


// Usecase Command
export type BookCreateCommand = Omit<
  IBook,
  "id" | "createdAt" | "updatedAt"
>;

export type BookUpdateCommand = Pick<
  IBook,
  "id"
> & {
  title?: string;
  author?: string;
  genre?: string;
  publishedYear?: number;
}


export interface BookQueryParams {
  perPage?: number;
  page?: number;
  search?: string;
}


export interface BookListRepositoryResult {
  data: IBook[];
  total: number;
}

export interface BookListResult {
  data: IBook[];
  metaData: {
    size: number;
    total: number;
    totalPage: number;
    page: number;
    perPage: number;
    hasNextPage: boolean;
  }
}
