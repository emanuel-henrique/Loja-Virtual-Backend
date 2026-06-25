import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Use memory storage for serverless compatibility (Vercel)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  // Convert image buffer to Base64 Data URL
  const base64Data = req.file.buffer.toString('base64');
  const imageUrl = `data:${req.file.mimetype};base64,${base64Data}`;
  
  res.json({ url: imageUrl });
});

export default router;
