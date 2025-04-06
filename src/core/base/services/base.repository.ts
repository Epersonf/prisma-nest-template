import { PrismaService } from '../../../core/prisma/prisma.service';
import { PaginatedList } from '../dtos/paginated-list.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { Prisma } from '@prisma/client';
import { DefaultSerializer } from '../../../core/serializer/default-serializer';
import { HttpException, HttpStatus } from '@nestjs/common';

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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Unique constraint failed', HttpStatus.BAD_REQUEST);
        } else if (error.code === 'P2003') {
          throw new HttpException('Foreign key constraint failed', HttpStatus.BAD_REQUEST);
        } else if (error.code === 'P2004') {
          throw new HttpException('Check constraint failed', HttpStatus.BAD_REQUEST);
        } else if (error.code === 'P2005') {
          throw new HttpException('Trigger constraint failed', HttpStatus.BAD_REQUEST);
        } else if (error.code === 'P2006') {
          throw new HttpException('Check constraint failed', HttpStatus.BAD_REQUEST);
        } else if (error.code === 'P2007') {
          throw new HttpException('Check constraint failed', HttpStatus.BAD_REQUEST);
        } else if (error.code === 'P2008') {
          throw new HttpException('Check constraint failed', HttpStatus.BAD_REQUEST);
        }
      }
      throw error;
    }
  }

  async update(params: {
    data: T[],
    tx?: Prisma.TransactionClient,
  }): Promise<T[]> {
    const json = DefaultSerializer.serializeObjectArray(params.data);
    const result = await this.getModel(params.tx).updateManyAndReturn({
      data: json,
    });
    const objects = DefaultSerializer.deserializeObjectArray(result, this.type) as T[];
    return objects;
  }

  async delete(params: {
    ids: string[],
    tx?: Prisma.TransactionClient,
  }): Promise<T[]> {
    const result = await this.getModel(params.tx).deleteManyAndReturn({
      where: { id: { in: params.ids } },
    });
    const objects = DefaultSerializer.deserializeObjectArray(result, this.type) as T[];
    return objects;
  }
}