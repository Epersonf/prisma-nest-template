import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BatchCreateUserDto } from './dto/create-user.dto';
import { BatchUpdateUserDto, UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { PaginationDto } from '../../core/base/dtos/pagination.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { PopulateUserDto } from './dto/populate-user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {}

  async create(batchCreateUserDto: BatchCreateUserDto) {
    const objs = batchCreateUserDto.users.map(e => new UserEntity({
      name: e.name,
      email: e.email,
      password: e.password,
      empresaId: e.enterpriseId
    }));
    const created = await this.usersRepository.create({ data: objs });
    return created;
  }

  findAll(params: {
    pagination?: PaginationDto,
    populate?: PopulateUserDto,
    filter?: FilterUserDto,
  }) {
    return this.usersRepository.findAll({
      where: {
        id: params.filter.ids ? { in: params.filter.ids } : undefined,
        enterpriseId: params.filter.enterpriseIds ? { in: params.filter.enterpriseIds } : undefined
      },
      include: {
        ...params.populate,
      },
      pagination: params.pagination,
    });
  }

  async update(updateUserDto: BatchUpdateUserDto): Promise<UserEntity[]> {
    const paginatedList = await this.usersRepository.findAll({
      where: {
        id: { in: updateUserDto.users.map(e => e.id) },
      }
    });

    paginatedList.getItems().forEach(e => {
      const user = updateUserDto.users.find(f => f.id === e.id);
      if (!user) return;
      if (user.email) e.setEmail(user.email);
      if (user.name) e.setName(user.name);
    });

    return paginatedList.getItems();
  }

  remove(ids: string[]) {
    return this.usersRepository.delete({
      ids,
    });
  }
}
