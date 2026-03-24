import { useMemo } from "react";
import ProductFilters from "../components/products/ProductFilters";
import ProductList from "../components/products/ProductList";
import { products } from "../data/products";
import { useProductStore } from "../stores/zustand/useProductStore";

export default function ZustandProductsPage() {
  // Zustand store에서 필터 상태와 함수 가져오기
  const {
    category,
    sortBy,
    minPrice,
    maxPrice,
    newOnly,
    setCategory,
    setSortBy,
    setMinPrice,
    setMaxPrice,
    toggleNewOnly,
    resetFilters,
  } = useProductStore();

  // 더미 데이터 + store 상태를 이용해서 최종 목록 계산
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. 카테고리 필터
    if (category !== "all") {
      result = result.filter((product) => product.category === category);
    }

    // 2. 최소 가격 이상
    result = result.filter((product) => product.price >= minPrice);

    // 3. 최대 가격 이하
    result = result.filter((product) => product.price <= maxPrice);

    // 4. 신상품만 보기
    if (newOnly) {
      result = result.filter((product) => product.isNew);
    }

    // 5. 정렬
    if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      // 신상품 우선: isNew true가 앞으로 오도록 정렬
      result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }

    return result;
  }, [category, sortBy, minPrice, maxPrice, newOnly]);

  return (
    <div className="space-y-6">
      {/* 위 칸: 필터 컨트롤 */}
      <ProductFilters
        category={category}
        sortBy={sortBy}
        minPrice={minPrice}
        maxPrice={maxPrice}
        newOnly={newOnly}
        onCategoryChange={setCategory}
        onSortByChange={setSortBy}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onToggleNewOnly={toggleNewOnly}
        onReset={resetFilters}
      />

      <section className="rounded-2xl border border-white/10 bg-[#2a2a2a] p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">상품 목록</h3>
          <span className="text-sm font-medium text-slate-400">총 {filteredProducts.length}개</span>
        </div>

        <ProductList products={filteredProducts} />
      </section>
    </div>
  );
}
