import { PrismaService } from '../../../core/prisma/prisma.service';
import { PaginatedList } from '../dtos/paginated-list.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { Prisma } from '@prisma/client';
import { DefaultSerializer } from '../../../core/serializer/default-serializer';
import { PrismaErrorCatcher } from '../../../core/prisma/prisma-error-catcher';
import { CommonEntity } from '../interfaces/common-entity.int';

export abstract class BaseRepository<
  T extends CommonEntity,
  TWhereInput=Record<string, any>,
  TInclude=Record<string, boolean>,
  TOrderBy=Record<string, 'asc' | 'desc'>
> {

  private readonly type: new () => object;
  private readonly modelName: string;
  private readonly prisma: PrismaService;

  constructor(params: {
    type: new () => object,
    prisma: PrismaService,
    modelName: string,
  }) {
    this.type = params.type;
    this.prisma = params.prisma;
    this.modelName = params.modelName;
  }

  private getModel(tx?: Prisma.TransactionClient) {
    if (Prisma.ModelName[this.modelName] === undefined) {
      throw new Error(`Model ${this.modelName} not found`);
    }
    return (this.prisma.getPrisma() || tx)[this.modelName];
  }

  async findAll(params?: {
    where?: TWhereInput,
    include?: TInclude,
    pagination?: PaginationDto,
    orderBy?: TOrderBy,
  }): Promise<PaginatedList<T>> {
    try {
      const result: any[] = await this.prisma.getPrisma().user.findMany({
        where: params?.where,
        include: params?.include,
        skip: params?.pagination?.getSkip(),
        take: params?.pagination?.getLimit(),
        orderBy: params?.orderBy,
      });
      const items = DefaultSerializer.deserializeObjectArray(result, this.type) as T[];

      const total: number = await this.getModel().count({ where: params?.where });
      return new PaginatedList({
        items,
        pageCount: params?.pagination?.getPageSize() ? Math.ceil(total / params.pagination.getPageSize()) : 1,
      });
    } catch (error) {
      PrismaErrorCatcher.handle(error);
      throw error;
    }
  }

  async create(params: {
    data: T[],
    tx?: Prisma.TransactionClient,
  }): Promise<T[]> {
    try {
      const json = DefaultSerializer.serializeObjectArray(params.data);
      const result = await this.getModel(params.tx).createManyAndReturn({
        data: json,
      });
      const objects = DefaultSerializer.deserializeObjectArray(result, this.type) as T[];
      return objects;
    } catch (error) {
      PrismaErrorCatcher.handle(error);
      throw error;
    }
  }

  async update(params: {
    data: T[],
    tx?: Prisma.TransactionClient,
  }): Promise<T[]> {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const list: any[] = [];
        for (const item of params.data) {
          if (!item.getId()) continue;
          const data = DefaultSerializer.serializeObject(item);
          const updated = await this.getModel(params.tx ?? tx).update({
            where: { id: item.getId() },
            data,
          });
          list.push(updated);
        }
        return list;
      });
      const objects = DefaultSerializer.deserializeObjectArray(result, this.type) as T[];
      return objects;
    } catch (error) {
      PrismaErrorCatcher.handle(error);
      throw error;
    }
  }

  async delete(params: {
    ids: string[],
    tx?: Prisma.TransactionClient,
  }): Promise<number> {
    try {
      const result = await this.getModel(params.tx).deleteMany({
        where: { id: { in: params.ids } },
      });
      return result.count;
    } catch (error) {
      PrismaErrorCatcher.handle(error);
      throw error;
    }
  }
}