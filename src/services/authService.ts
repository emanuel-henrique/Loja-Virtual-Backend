import { comparePassword, generateToken, hashPassword } from '../utils/jwt';
import { env } from '../config/env';
import { AppError } from '../middlewares/errorHandler';

export class AuthService {
  async login(email: string, password: string): Promise<{ token: string }> {
    if (email !== env.ADMIN_EMAIL) {
      throw new AppError(401, 'Invalid credentials');
    }

    const hashedPassword = await hashPassword(env.ADMIN_PASSWORD);
    const isValid = await comparePassword(password, hashedPassword);

    if (!isValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    const token = generateToken('admin');

    return { token };
  }
}
