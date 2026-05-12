import mongoose, { Schema } from 'mongoose';
import { IMedia } from '../types';

const MediaSchema = new Schema<IMedia>({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['image', 'video', 'reel'], required: true },
  url: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  cloudinaryId: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  order: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IMedia>('Media', MediaSchema);