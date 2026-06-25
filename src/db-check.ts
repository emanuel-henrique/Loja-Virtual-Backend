import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const products = await prisma.product.findMany();
  console.log('Products in DB:', JSON.stringify(products.map(p => ({ id: p.id, name: p.name, category: p.category })), null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
