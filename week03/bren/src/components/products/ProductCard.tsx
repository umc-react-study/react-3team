import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

const categoryLabelMap = {
  top: "상의",
  bottom: "하의",
  shoes: "신발",
  accessory: "액세서리",
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#333333] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-lg font-bold text-white">{product.name}</h4>

        {product.isNew && (
          <span className="rounded-md bg-violet-500/20 px-3 py-1 text-xs font-semibold text-violet-300">NEW</span>
        )}
      </div>

      <p className="mt-4 text-sm text-slate-400">카테고리: {categoryLabelMap[product.category]}</p>

      <p className="mt-3 text-xl font-semibold text-white">{product.price.toLocaleString()}원</p>
    </div>
  );
}
