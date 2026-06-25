import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

function mapSlide(s: any) {
  return {
    id: s.id,
    eyebrow: s.eyebrow,
    title: s.title,
    description: s.description,
    cta: s.cta,
    cta_hash: s.ctaHash,
    image_url: s.imageUrl,
    image_opacity: s.imageOpacity ?? 1.0,
    is_active: s.isActive,
    order: s.order,
  };
}

// GET /api/carousel-slides — public, returns active slides ordered
router.get('/', async (_req, res) => {
  try {
    const slides = await prisma.carouselSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json(slides.map(mapSlide));
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
    res.json(slides.map(mapSlide));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slides' });
  }
});

// POST /api/carousel-slides — create
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { eyebrow, title, description, cta, cta_hash, image_url, image_opacity, is_active, order } = req.body;
    const slide = await prisma.carouselSlide.create({
      data: {
        eyebrow: eyebrow ?? '',
        title: title ?? 'Título do slide',
        description: description ?? '',
        cta: cta ?? 'Ver catálogo',
        ctaHash: cta_hash ?? 'catalogo',
        imageUrl: image_url ?? null,
        imageOpacity: image_opacity !== undefined ? Number(image_opacity) : 1.0,
        isActive: is_active ?? true,
        order: order ?? 0,
      },
    });
    res.json(mapSlide(slide));
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/carousel-slides/:id — update
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id as string;
    const { eyebrow, title, description, cta, cta_hash, image_url, image_opacity, is_active, order } = req.body;
    const slide = await prisma.carouselSlide.update({
      where: { id },
      data: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(cta !== undefined && { cta }),
        ...(cta_hash !== undefined && { ctaHash: cta_hash }),
        ...(image_url !== undefined && { imageUrl: image_url }),
        ...(image_opacity !== undefined && { imageOpacity: Number(image_opacity) }),
        ...(is_active !== undefined && { isActive: is_active }),
        ...(order !== undefined && { order }),
      },
    });
    res.json(mapSlide(slide));
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/carousel-slides/:id — delete
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.carouselSlide.delete({ where: { id: req.params.id as string } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
