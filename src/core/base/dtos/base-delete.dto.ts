import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class BaseDeleteDto {
  @ApiProperty({ required: true })
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  @IsNotEmpty()
  ids: string[];
}