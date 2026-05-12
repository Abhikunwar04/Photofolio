import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Media from '../models/Media.model';

// Public
export const getMedia = async (req: Request, res: Response): Promise<void> => {
  const { category, type } = req.query;

  const filter: any = {};
  if (category) filter.category = category;
  if (type) filter.type = type;

  const media = await Media.find(filter)
    .populate('category', 'name slug color icon')
    .sort({ order: 1, createdAt: -1 });

  res.status(200).json({ success: true, data: media });
};

export const incrementViews = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const media = await Media.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
  res.status(200).json({ success: true, data: media });
};

// Admin
export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'File required' });
    return;
  }

  const { title, type, category, order } = req.body;
  const file = req.file as any;

  const media = await Media.create({
    title,
    type,
    category,
    order: order || 0,
    url: file.path,
    thumbnail: file.path,
    cloudinaryId: file.filename,
  });

  const populated = await media.populate('category', 'name slug');
  res.status(201).json({ success: true, data: populated });
};

export const updateMedia = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, category, order } = req.body;

  const media = await Media.findByIdAndUpdate(
    id,
    { title, category, order },
    { new: true }
  ).populate('category', 'name slug');

  if (!media) {
    res.status(404).json({ success: false, message: 'Media not found' });
    return;
  }

  res.status(200).json({ success: true, data: media });
};

export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const media = await Media.findById(id);
  if (!media) {
    res.status(404).json({ success: false, message: 'Media not found' });
    return;
  }

  // Cloudinary se bhi delete karo
  await cloudinary.uploader.destroy(media.cloudinaryId, {
    resource_type: media.type === 'image' ? 'image' : 'video',
  });

  await Media.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: 'Media deleted' });
};

export const reorderMedia = async (req: Request, res: Response): Promise<void> => {
  const { items } = req.body; // [{ id, order }]

  await Promise.all(
    items.map(({ id, order }: { id: string; order: number }) =>
      Media.findByIdAndUpdate(id, { order })
    )
  );

  res.status(200).json({ success: true, message: 'Reordered successfully' });
};