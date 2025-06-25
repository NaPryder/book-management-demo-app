type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  updatedAt: string;
  createdAt: string;
};


type BookListResponse = {
  data: Book[];
  metaData: {
    size: number;
    total: number;
    totalPage: number;
    page: number;
    perPage: number;
    hasNextPage: boolean;
  }
}