// 상품 카테고리 타입
export type ProductCategory = "top" | "bottom" | "shoes" | "accessory";

// 필터용 카테고리 타입
export type ProductCategoryFilter = "all" | ProductCategory;

// 정렬 타입
export type ProductSortOption = "newest" | "priceLow" | "priceHigh";

// 상품 한 개의 구조
export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  isNew: boolean;
};
