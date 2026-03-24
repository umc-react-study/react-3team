import type { ProductCategoryFilter, ProductSortOption } from "../../types/product";

type ProductFiltersProps = {
  category: ProductCategoryFilter;
  sortBy: ProductSortOption;
  minPrice: number;
  maxPrice: number;
  newOnly: boolean;
  onCategoryChange: (value: ProductCategoryFilter) => void;
  onSortByChange: (value: ProductSortOption) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onToggleNewOnly: () => void;
  onReset: () => void;
};

export default function ProductFilters({
  category,
  sortBy,
  minPrice,
  maxPrice,
  newOnly,
  onCategoryChange,
  onSortByChange,
  onMinPriceChange,
  onMaxPriceChange,
  onToggleNewOnly,
  onReset,
}: ProductFiltersProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#2a2a2a] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">필터 컨트롤</h3>

        <button
          onClick={onReset}
          className="rounded-lg border border-white/10 bg-[#353535] px-4 py-2 text-sm text-slate-200 transition hover:bg-[#404040]"
        >
          초기화
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 카테고리 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">카테고리</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as ProductCategoryFilter)}
            className="w-full rounded-xl border border-white/10 bg-[#333333] px-4 py-3 text-sm text-white outline-none"
          >
            <option value="all">전체</option>
            <option value="top">상의</option>
            <option value="bottom">하의</option>
            <option value="shoes">신발</option>
            <option value="accessory">액세서리</option>
          </select>
        </div>

        {/* 정렬 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">정렬</label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as ProductSortOption)}
            className="w-full rounded-xl border border-white/10 bg-[#333333] px-4 py-3 text-sm text-white outline-none"
          >
            <option value="newest">신상품 우선</option>
            <option value="priceLow">가격 낮은순</option>
            <option value="priceHigh">가격 높은순</option>
          </select>
        </div>

        {/* 최소 가격 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">최소 가격</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(Number(e.target.value))}
            className="w-full rounded-xl border border-white/10 bg-[#333333] px-4 py-3 text-sm text-white outline-none"
          />
        </div>

        {/* 최대 가격 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">최대 가격</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full rounded-xl border border-white/10 bg-[#333333] px-4 py-3 text-sm text-white outline-none"
          />
        </div>
      </div>

      {/* 신상품만 보기 */}
      <div className="mt-4 flex items-center gap-3">
        <input
          id="new-only"
          type="checkbox"
          checked={newOnly}
          onChange={onToggleNewOnly}
          className="h-4 w-4 rounded border-white/20 bg-[#333333] accent-violet-500"
        />
        <label htmlFor="new-only" className="text-sm text-slate-200">
          신상품만 보기
        </label>
      </div>
    </section>
  );
}
