
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
  limit?: number;
  // offset?: number;
  cursor?: string;
}

export interface BookListResult {
  data: IBook[];
  metaData: {
    size: number;
    total: number;
    lastCursor?: string | null;
    hasNextPage?: boolean;
  }

}
