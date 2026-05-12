import { Request, Response } from 'express';
import Category from '../models/Category.model';

// Public
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  const categories = await Category.find().sort({ order: 1 });
  res.status(200).json({ success: true, data: categories });
};

// Admin
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { name, icon, color, order } = req.body;

  const slug = name.toLowerCase().replace(/\s+/g, '-');

  const existing = await Category.findOne({ slug });
  if (existing) {
    res.status(400).json({ success: false, message: 'Category already exists' });
    return;
  }

  const category = await Category.create({ name, slug, icon, color, order });
  res.status(201).json({ success: true, data: category });
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, icon, color, order, coverImage } = req.body;

  const slug = name ? name.toLowerCase().replace(/\s+/g, '-') : undefined;

  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug, icon, color, order, coverImage },
    { new: true, runValidators: true }
  );

  if (!category) {
    res.status(404).json({ success: false, message: 'Category not found' });
    return;
  }

  res.status(200).json({ success: true, data: category });
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    res.status(404).json({ success: false, message: 'Category not found' });
    return;
  }

  res.status(200).json({ success: true, message: 'Category deleted' });
};