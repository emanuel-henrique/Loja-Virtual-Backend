import { PrismaClient } from '@prisma/client';
import { CreateCategoryInput, UpdateCategoryInput } from '../schemas/categorySchema';

const prisma = new PrismaClient();

export class CategoryService {
  async getAllCategories() {
    return await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
  }

  async getCategoryById(id: string) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { status: 'in_stock' },
          take: 10
        }
      }
    });
  }

  async getCategoryBySlug(slug: string) {
    return await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: 'in_stock' },
          take: 10
        }
      }
    });
  }

  async createCategory(data: CreateCategoryInput) {
    return await prisma.category.create({
      data
    });
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    return await prisma.category.update({
      where: { id },
      data
    });
  }

  async deleteCategory(id: string) {
    return await prisma.category.delete({
      where: { id }
    });
  }
}
