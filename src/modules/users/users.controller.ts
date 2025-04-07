import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { BatchCreateUserDto } from './dto/create-user.dto';
import { BatchUpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../core/base/dtos/pagination.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { PopulateUserDto } from './dto/populate-user.dto';
import { BaseDeleteDto } from '../../core/base/dtos/base-delete.dto';
import { PaginatedList } from 'src/core/base/dtos/paginated-list.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: BatchCreateUserDto): Promise<UserEntity[]> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() filter: FilterUserDto,
    @Query() populate: PopulateUserDto,
    @Query() pagination?: PaginationDto,
  ): Promise<PaginatedList<UserEntity>> {
    return this.usersService.findAll({
      filter,
      populate,
      pagination
    });
  }

  @Patch()
  update(@Body() batchUpdateUserDto: BatchUpdateUserDto): Promise<UserEntity[]> {
    return this.usersService.update(batchUpdateUserDto);
  }

  @Delete()
  remove(@Query() baseDelete: BaseDeleteDto): Promise<number> {
    return this.usersService.remove(baseDelete.ids);
  }
}
