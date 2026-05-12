import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../types';

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  icon: { type: String, default: '📁' },
  color: { type: String, default: '#6366f1' },
  coverImage: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<ICategory>('Category', CategorySchema);