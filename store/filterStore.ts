import { create } from 'zustand';

interface FilterState {
  priceRange: [number, number];
  rating: number;
  styles: string[];
  city: string;
  search: string;
  setPriceRange: (range: [number, number]) => void;
  setRating: (value: number) => void;
  setStyles: (styles: string[]) => void;
  setCity: (city: string) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
  priceRange: [0, 20000],
  rating: 0,
  styles: [],
  city: '',
  search: '',
  setPriceRange: (range) => set({ priceRange: range }),
  setRating: (value) => set({ rating: value }),
  setStyles: (styles) => set({ styles }),
  setCity: (city) => set({ city }),
  setSearch: (search) => set({ search }),
  resetFilters: () =>
    set({
      priceRange: [0, 20000], 
      rating: 0,
      styles: [],
      city: '',
      search: '',
    }),
}));

export default useFilterStore;
