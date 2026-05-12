import { Router } from 'express';
import {
  getMedia,
  uploadMedia,
  updateMedia,
  deleteMedia,
  reorderMedia,
  incrementViews,
} from '../controllers/media.controller';
import authMiddleware from '../middleware/auth.middleware';
import upload from '../middleware/upload.middleware';

const router = Router();

// Public
router.get('/', getMedia);
router.patch('/:id/views', incrementViews);

// Admin only
router.post('/upload', authMiddleware, upload.single('file'), uploadMedia);
router.put('/:id', authMiddleware, updateMedia);
router.delete('/:id', authMiddleware, deleteMedia);
router.patch('/reorder', authMiddleware, reorderMedia);

export default router;