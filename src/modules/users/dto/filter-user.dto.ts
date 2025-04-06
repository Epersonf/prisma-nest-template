import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterDto } from "../../../core/base/interfaces/base-filter.int";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class FilterUserDto implements BaseFilterDto {
  @ApiProperty({ required: false })
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  @IsOptional()
  ids?: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  @IsOptional()
  enterpriseIds?: string[];
}