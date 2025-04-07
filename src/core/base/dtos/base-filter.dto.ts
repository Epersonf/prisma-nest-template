import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class BaseFilterDto {
  @ApiProperty({ required: false })
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  @IsOptional()
  ids?: string[];
}