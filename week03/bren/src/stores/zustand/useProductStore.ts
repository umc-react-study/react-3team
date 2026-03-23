import { create } from "zustand";
import type { ProductCategoryFilter, ProductSortOption } from "../../types/product";

type ProductFilterStore = {
  category: ProductCategoryFilter;
  sortBy: ProductSortOption;
  minPrice: number;
  maxPrice: number;
  newOnly: boolean;

  setCategory: (category: ProductCategoryFilter) => void;
  setSortBy: (sortBy: ProductSortOption) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  toggleNewOnly: () => void;
  resetFilters: () => void;
};

const initialState = {
  category: "all" as ProductCategoryFilter,
  sortBy: "newest" as ProductSortOption,
  minPrice: 0,
  maxPrice: 100000,
  newOnly: false,
};

export const useProductStore = create<ProductFilterStore>((set) => ({
  ...initialState,

  setCategory: (category) => set({ category }),
  setSortBy: (sortBy) => set({ sortBy }),
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxPrice: (price) => set({ maxPrice: price }),

  toggleNewOnly: () =>
    set((state) => ({
      newOnly: !state.newOnly,
    })),

  resetFilters: () => set(initialState),
}));
