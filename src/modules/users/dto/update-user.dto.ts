import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class BatchUpdateUserDto {
  @ApiProperty({ type: [UpdateUserDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  users: UpdateUserDto[];
}
