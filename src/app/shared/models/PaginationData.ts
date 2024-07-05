export class PaginationData {
  constructor(
    public currentPage: number = 1,
    public totalPages: number = 1,
    public totalItems: number = 0,
    public itemsPerPage: number = 10
  ) {}
}
