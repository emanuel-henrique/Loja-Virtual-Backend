import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import productRoutes from './routes/productRoutes';
import couponRoutes from './routes/couponRoutes';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import categoryRoutes from './routes/categoryRoutes';
import sizeConfigRoutes from './routes/sizeConfigRoutes';
import sizeGuideRoutes from './routes/sizeGuideRoutes';
import typeConfigRoutes from './routes/typeConfigRoutes';
import siteConfigRoutes from './routes/siteConfigRoutes';
import path from 'path';

function getAllowedOrigins(): string[] {
  const origins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:8081',
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

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/products', productRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/size-configs', sizeConfigRoutes);
app.use('/api/size-guides', sizeGuideRoutes);
app.use('/api/type-configs', typeConfigRoutes);
app.use('/api/site-config', siteConfigRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
