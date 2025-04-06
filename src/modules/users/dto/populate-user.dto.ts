import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

export class PopulateUserDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  empresa: boolean;
}