import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();


// Use memory storage – file buffer is streamed directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Apenas imagens são permitidas'));
    }
    cb(null, true);
  },
});

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Nenhum arquivo enviado' });
    return;
  }

  // Check if Cloudinary is configured (trim to avoid empty-string false positives)
  const cloudName = (process.env.CLOUDINARY_CLOUD_NAME ?? '').trim();
  const apiKey = (process.env.CLOUDINARY_API_KEY ?? '').trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET ?? '').trim();
  const isCloudinaryConfigured = cloudName && apiKey && apiSecret;

  // Re-configure Cloudinary per-request with trimmed values
  if (isCloudinaryConfigured) {
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  }

  const toBase64 = () => {
    const base64 = req.file!.buffer.toString('base64');
    return `data:${req.file!.mimetype};base64,${base64}`;
  };

  if (!isCloudinaryConfigured) {
    // Fallback: return base64 data URL when Cloudinary is not set up
    res.json({ url: toBase64() });
    return;
  }

  try {
    // Upload directly from buffer to Cloudinary using stream
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'loja-roupas',
          resource_type: 'image',
          transformation: [
            { quality: 'auto', fetch_format: 'auto' },
            { width: 1920, height: 1080, crop: 'limit' },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as { secure_url: string });
        }
      );
      stream.end(req.file!.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (err: any) {
    console.error('Cloudinary upload error:', err);
    // Fallback to base64 instead of crashing with 500
    res.json({ url: toBase64() });
  }
});

export default router;
