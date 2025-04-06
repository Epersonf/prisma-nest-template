
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  
  private prisma = new PrismaClient();
  
  public getPrisma() {
    return this.prisma;
  }

  async onModuleInit() {
    await this.$connect();
  }
}
