import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { asyncHandler } from '../middlewares/errorHandler';

const authService = new AuthService();

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json(result);
});
