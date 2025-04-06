import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterDto } from "../../../core/base/interfaces/base-filter.int";
import { Transform } from "class-transformer";

export class FilterUserDto implements BaseFilterDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  ids?: string[];

  @ApiProperty({ required: false })
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  enterpriseIds?: string[];
}