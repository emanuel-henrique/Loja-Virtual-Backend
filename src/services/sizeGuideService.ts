import { PrismaClient } from '@prisma/client';
import { CreateSizeGuideInput, UpdateSizeGuideInput } from '../schemas/sizeGuideSchema';

const prisma = new PrismaClient();

export class SizeGuideService {
  async getAllSizeGuides() {
    return await prisma.sizeGuide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
  }

  async getSizeGuideById(id: string) {
    return await prisma.sizeGuide.findUnique({
      where: { id }
    });
  }

  async createSizeGuide(data: CreateSizeGuideInput) {
    return await prisma.sizeGuide.create({
      data
    });
  }

  async updateSizeGuide(id: string, data: UpdateSizeGuideInput) {
    return await prisma.sizeGuide.update({
      where: { id },
      data
    });
  }

  async deleteSizeGuide(id: string) {
    return await prisma.sizeGuide.delete({
      where: { id }
    });
  }
}
