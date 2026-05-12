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
  category: Category;
  order: number;
  views: number;
}

interface PortfolioStore {
  categories: Category[];
  media: Media[];
  selectedCategory: string | null;
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
  fetchMedia: (categoryId?: string) => Promise<void>;
  setSelectedCategory: (id: string | null) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  categories: [],
  media: [],
  selectedCategory: null,
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get('/categories');
      set({ categories: res.data.data });
    } catch (err) {
      console.error('Categories fetch error:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMedia: async (categoryId?: string) => {
    set({ isLoading: true });
    try {
      const url = categoryId ? `/media?category=${categoryId}` : '/media';
      const res = await api.get(url);
      set({ media: res.data.data });
    } catch (err) {
      console.error('Media fetch error:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedCategory: (id) => set({ selectedCategory: id }),
}));