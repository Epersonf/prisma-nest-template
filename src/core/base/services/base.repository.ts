import { PrismaService } from '../../../core/prisma/prisma.service';
import { PaginatedList } from '../dtos/paginated-list.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { Prisma } from '@prisma/client';
import { DefaultSerializer } from '../../../core/serializer/default-serializer';
import { PrismaErrorCatcher } from '../../../core/prisma/prisma-error-catcher';

export abstract class BaseRepository<
  T,
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
    empresaId: string | null, // YOU CAN PASS NULL, BUT YOU'LL HAVE TO DO IT EXPLICITLY
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
        total,
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
      const json = DefaultSerializer.serializeObjectArray(params.data);
      const result = await this.getModel(params.tx).updateManyAndReturn({
        data: json,
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
  }): Promise<T[]> {
    try {
      const result = await this.getModel(params.tx).deleteManyAndReturn({
        where: { id: { in: params.ids } },
      });
      const objects = DefaultSerializer.deserializeObjectArray(result, this.type) as T[];
      return objects;
    } catch (error) {
      PrismaErrorCatcher.handle(error);
      throw error;
    }
  }
}