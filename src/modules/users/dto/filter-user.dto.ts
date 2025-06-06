import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterDto } from "../../../core/base/dtos/base-filter.dto";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class FilterUserDto extends BaseFilterDto {
  @ApiProperty({ required: false })
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  @IsOptional()
  enterpriseIds?: string[];
}