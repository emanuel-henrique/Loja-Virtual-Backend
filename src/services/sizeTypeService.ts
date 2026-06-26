import { PrismaClient } from '@prisma/client';
import { CreateSizeTypeInput, UpdateSizeTypeInput } from '../schemas/sizeTypeSchema';

const prisma = new PrismaClient();

export class SizeTypeService {
  async getAllSizeTypes() {
    return await prisma.sizeType.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        sizeConfigs: {
          where: { isActive: true },
          orderBy: { order: 'asc' }
        }
      }
    });
  }

  async getSizeTypeById(id: string) {
    return await prisma.sizeType.findUnique({
      where: { id },
      include: {
        sizeConfigs: {
          where: { isActive: true },
          orderBy: { order: 'asc' }
        }
      }
    });
  }

  async createSizeType(data: CreateSizeTypeInput) {
    return await prisma.sizeType.create({
      data: {
        name: data.name,
        slug: data.slug,
        isActive: true,
        order: data.order ?? 0,
      }
    });
  }

  async updateSizeType(id: string, data: UpdateSizeTypeInput) {
    return await prisma.sizeType.update({
      where: { id },
      data
    });
  }

  async deleteSizeType(id: string) {
    return await prisma.sizeType.delete({
      where: { id }
    });
  }

  async getSizeTypesByCategory(categoryId: string) {
    const categorySizeTypes = await prisma.categorySizeType.findMany({
      where: { categoryId },
      include: {
        sizeType: {
          include: {
            sizeConfigs: {
              where: { isActive: true },
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    return categorySizeTypes.map(cst => cst.sizeType);
  }
}
