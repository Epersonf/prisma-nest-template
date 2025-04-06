export class PaginatedList<T> {
  
  private items: T[];
  private totalPages: number;

  constructor(params: {
    items: T[],
    total: number,
  }) {
    this.items = params.items;
    this.totalPages = params.total;
  }

  public setItems(items: T[]): void {
    this.items = items;
  }

  public getItems(): T[] {
    return this.items;
  }

  public setTotalPages(total: number): void {
    this.totalPages = total;
  }

  public getTotalPages(): number {
    return this.totalPages;
  }

}