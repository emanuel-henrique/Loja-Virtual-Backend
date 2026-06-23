import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { asyncHandler } from '../middlewares/errorHandler';

const productService = new ProductService();

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts(req.query as any);
  res.json(products);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  // Forçando o parâmetro a ser tratado estritamente como string
  const { id } = req.params as { id: string };
  const product = await productService.getProductById(id);
  res.json(product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  // Garantindo que o id seja estritamente uma string no update
  const { id } = req.params as { id: string };
  const product = await productService.updateProduct(id, req.body);
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  // Garantindo que o id seja estritamente uma string no delete
  const { id } = req.params as { id: string };
  await productService.deleteProduct(id);
  res.status(204).send();
});
