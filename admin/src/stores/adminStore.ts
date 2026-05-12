import { create } from 'zustand';
import api from '../lib/api';

interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  coverImage: string;
  order: number;
}

interface Media {
  _id: string;
  title: string;
  type: 'image' | 'video' | 'reel';
  url: string;
  thumbnail: string;
  cloudinaryId: string;
  category: Category;
  order: number;
  views: number;
  createdAt: string;
}

interface AdminStore {
  categories: Category[];
  media: Media[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
  fetchMedia: () => Promise<void>;
  createCategory: (data: Partial<Category>) => Promise<boolean>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  deleteMedia: (id: string) => Promise<boolean>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  categories: [],
  media: [],
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get('/categories');
      set({ categories: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMedia: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get('/media');
      set({ media: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  createCategory: async (data) => {
    try {
      await api.post('/categories', data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  updateCategory: async (id, data) => {
    try {
      await api.put(`/categories/${id}`, data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  deleteCategory: async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((c) => c._id !== id),
      }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  deleteMedia: async (id) => {
    try {
      await api.delete(`/media/${id}`);
      set((state) => ({
        media: state.media.filter((m) => m._id !== id),
      }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
}));