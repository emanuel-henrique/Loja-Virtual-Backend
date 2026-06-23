import app from './app';
import { env } from './config/env';

if (!process.env.VERCEL) {
  const PORT = env.PORT;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;
