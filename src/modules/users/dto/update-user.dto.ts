import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
}

export class BatchUpdateUserDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  users: UpdateUserDto[];
}
