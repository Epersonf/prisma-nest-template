import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
  @ApiProperty()
  private page?: number;
  @ApiProperty()
  private pageSize?: number;

  constructor(params?: {
    page: number,
    pageSize: number
  }) {
    this.page = params?.page;
    this.pageSize = params?.pageSize;
  }

  public setPageSize(pageSize: number): void {
    this.pageSize = pageSize;
  }

  public setPage(page: number): void {
    this.page = page;
  }

  public getSkip(): number | undefined {
    if (!this.page || !this.pageSize) return undefined;
    return (this.page - 1) * this.pageSize;
  }

  public getLimit(): number | undefined {
    if (!this.page || !this.pageSize) return undefined;
    return this.pageSize;
  }
}