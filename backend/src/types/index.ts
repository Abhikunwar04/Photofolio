import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin';
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  icon: string;
  color: string;
  coverImage: string;
  order: number;
  createdAt: Date;
}

export interface IMedia extends Document {
  title: string;
  type: 'image' | 'video' | 'reel';
  url: string;
  thumbnail: string;
  cloudinaryId: string;
  category: Types.ObjectId;
  order: number;
  views: number;
  createdAt: Date;
}