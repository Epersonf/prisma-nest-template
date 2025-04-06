import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { BatchCreateUserDto, CreateUserDto } from './dto/create-user.dto';
import { BatchUpdateUserDto, UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../core/base/dtos/pagination.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { PopulateUserDto } from './dto/populate-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: BatchCreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() filter: FilterUserDto,
    @Query() populate: PopulateUserDto,
    @Query() pagination?: PaginationDto,
  ) {
    return this.usersService.findAll({
      filter,
      populate,
      pagination
    });
  }

  @Patch()
  update(@Body() batchUpdateUserDto: BatchUpdateUserDto) {
    return this.usersService.update(batchUpdateUserDto);
  }

  @Delete()
  remove(@Query() ids: string[]) {
    return this.usersService.remove(ids);
  }
}
