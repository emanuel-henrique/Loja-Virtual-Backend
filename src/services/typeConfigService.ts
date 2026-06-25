import { PrismaClient } from '@prisma/client';
import { CreateTypeConfigInput, UpdateTypeConfigInput } from '../schemas/typeConfigSchema';

const prisma = new PrismaClient();

export class TypeConfigService {
  async getAllTypeConfigs() {
    return await prisma.typeConfig.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
  }

  async getTypeConfigById(id: string) {
    return await prisma.typeConfig.findUnique({
      where: { id }
    });
  }

  async createTypeConfig(data: CreateTypeConfigInput) {
    return await prisma.typeConfig.create({
      data
    });
  }

  async updateTypeConfig(id: string, data: UpdateTypeConfigInput) {
    return await prisma.typeConfig.update({
      where: { id },
      data
    });
  }

  async deleteTypeConfig(id: string) {
    return await prisma.typeConfig.delete({
      where: { id }
    });
  }
}
