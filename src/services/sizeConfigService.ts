import { PrismaClient } from '@prisma/client';
import { CreateSizeConfigInput, UpdateSizeConfigInput } from '../schemas/sizeConfigSchema';

const prisma = new PrismaClient();

export class SizeConfigService {
  async getAllSizeConfigs() {
    return await prisma.sizeConfig.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
  }

  async getSizeConfigById(id: string) {
    return await prisma.sizeConfig.findUnique({
      where: { id }
    });
  }

  async createSizeConfig(data: CreateSizeConfigInput) {
    return await prisma.sizeConfig.create({
      data
    });
  }

  async updateSizeConfig(id: string, data: UpdateSizeConfigInput) {
    return await prisma.sizeConfig.update({
      where: { id },
      data
    });
  }

  async deleteSizeConfig(id: string) {
    return await prisma.sizeConfig.delete({
      where: { id }
    });
  }
}
