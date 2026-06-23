import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import productRoutes from './routes/productRoutes';
import couponRoutes from './routes/couponRoutes';
import authRoutes from './routes/authRoutes';

function getAllowedOrigins(): string[] {
  const origins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:8080',
  ].filter(Boolean) as string[];

  return [...new Set(origins)];
}

function isAllowedOrigin(origin: string): boolean {
  if (getAllowedOrigins().includes(origin)) return true;
  return /^https:\/\/[\w-]+(?:-[\w-]+)*\.vercel\.app$/.test(origin);
}

const app: Application = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/admin', authRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
