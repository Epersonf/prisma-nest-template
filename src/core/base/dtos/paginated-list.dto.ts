export class PaginatedList<T> {
  
  private items: T[];
  private pageCount: number;

  constructor(params: {
    items: T[],
    pageCount: number,
  }) {
    this.items = params.items;
    this.pageCount = params.pageCount;
  }

  public setItems(items: T[]): void {
    this.items = items;
  }

  public getItems(): T[] {
    return this.items;
  }

  public setTotalPages(total: number): void {
    this.pageCount = total;
  }

  public getTotalPages(): number {
    return this.pageCount;
  }

}