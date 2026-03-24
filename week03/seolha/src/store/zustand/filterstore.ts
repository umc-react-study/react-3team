import { create } from "zustand";

type Category = "all" | "tops" | "pants" | "shoes" | "accessories";
type Sort = "newest" | "price-low" | "price-high";

interface FilterState {
  category: Category;
  sort: Sort;
  minPrice: string; 
  maxPrice: string; 
  onlyNew: boolean;

  setCategory: (category: Category) => void;
  setSort: (sort: Sort) => void;
  setMinPrice: (price: string) => void; 
  setMaxPrice: (price: string) => void;
  setOnlyNew: (value: boolean) => void;

  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: "all",
  sort: "newest",
  minPrice: "0",  
  maxPrice: "100000",
  onlyNew: false,

  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setOnlyNew: (onlyNew) => set({ onlyNew }),

  reset: () =>
    set({
      category: "all",
      sort: "newest",
      minPrice: "0",   
      maxPrice: "100000",
      onlyNew: false,
    }),
}));