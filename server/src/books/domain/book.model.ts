

export interface Book {
  id: number;
  title: string;
  author: string;
  genre?: string;
  publishedYear?: number;
  createdAt: Date;
  updatedAt: Date;
}


// Usecase Command
export type BookCreateCommand = Omit<
  Book,
  "id" | "createdAt" | "updatedAt"
>;

export type BookUpdateCommand = Pick<
  Book,
  "id"
> & {
  title?: string;
  author?: string;
  genre?: string;
  publishedYear?: number;
}

