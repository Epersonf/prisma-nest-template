import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../core/base/services/base.repository";
import { PrismaService } from "../../core/prisma/prisma.service";
import { UserEntity } from "./entities/user.entity";
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository extends BaseRepository<
  UserEntity,
  Prisma.UserWhereInput,
  Prisma.UserInclude,
  Prisma.UserOrderByWithRelationInput
> {

  constructor(
    prismaService: PrismaService,
  ) {
    super({
      type: UserEntity,
      empresaId: null,
      prisma: prismaService,
      modelName: 'User',
    });
  } 

}