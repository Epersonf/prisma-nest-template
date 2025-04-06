import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  private page?: number;
  public getPage(): number | undefined {
    return this.page;
  }
  
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  private pageSize?: number;
  public getPageSize(): number | undefined {
    return this.pageSize;
  }

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