import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// GET /api/carousel-slides — public, returns active slides ordered
router.get('/', async (_req, res) => {
  try {
    const slides = await prisma.carouselSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json(slides.map(s => ({
      id: s.id,
      eyebrow: s.eyebrow,
      title: s.title,
      description: s.description,
      cta: s.cta,
      cta_hash: s.ctaHash,
      image_url: s.imageUrl,
      is_active: s.isActive,
      order: s.order,
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slides' });
  }
});

// GET /api/carousel-slides/admin — admin, returns all slides
router.get('/admin', authMiddleware, async (_req, res) => {
  try {
    const slides = await prisma.carouselSlide.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(slides.map(s => ({
      id: s.id,
      eyebrow: s.eyebrow,
      title: s.title,
      description: s.description,
      cta: s.cta,
      cta_hash: s.ctaHash,
      image_url: s.imageUrl,
      is_active: s.isActive,
      order: s.order,
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slides' });
  }
});

// POST /api/carousel-slides — create
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { eyebrow, title, description, cta, cta_hash, image_url, is_active, order } = req.body;
    const slide = await prisma.carouselSlide.create({
      data: {
        eyebrow: eyebrow ?? '',
        title: title ?? 'Título do slide',
        description: description ?? '',
        cta: cta ?? 'Ver catálogo',
        ctaHash: cta_hash ?? 'catalogo',
        imageUrl: image_url ?? null,
        isActive: is_active ?? true,
        order: order ?? 0,
      },
    });
    res.json({
      id: slide.id,
      eyebrow: slide.eyebrow,
      title: slide.title,
      description: slide.description,
      cta: slide.cta,
      cta_hash: slide.ctaHash,
      image_url: slide.imageUrl,
      is_active: slide.isActive,
      order: slide.order,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/carousel-slides/:id — update
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { eyebrow, title, description, cta, cta_hash, image_url, is_active, order } = req.body;
    const slide = await prisma.carouselSlide.update({
      where: { id },
      data: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(cta !== undefined && { cta }),
        ...(cta_hash !== undefined && { ctaHash: cta_hash }),
        ...(image_url !== undefined && { imageUrl: image_url }),
        ...(is_active !== undefined && { isActive: is_active }),
        ...(order !== undefined && { order }),
      },
    });
    res.json({
      id: slide.id,
      eyebrow: slide.eyebrow,
      title: slide.title,
      description: slide.description,
      cta: slide.cta,
      cta_hash: slide.ctaHash,
      image_url: slide.imageUrl,
      is_active: slide.isActive,
      order: slide.order,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/carousel-slides/:id — delete
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.carouselSlide.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
