import { useFilterStore } from "../../store/zustand/filterstore";

export default function ProductList() {
    const { category, sort, minPrice, maxPrice, onlyNew } = useFilterStore();

    const products = [
        { id: "1", name: "베이직 반팔 티", price: 19000, category: "상의", new: true },
        { id: "2", name: "스트라이프 셔츠", price: 42000, category: "상의", new: true },
        { id: "3", name: "스니커즈", price: 60000, category: "신발", new: true },
        { id: "4", name: "와이드 데님 팬츠", price: 45000, category: "하의", new: false },
        { id: "5", name: "미니 크로스백", price: 39000, category: "액세서리", new: false },
        { id: "6", name: "코튼 조거 팬츠", price: 36000, category: "하의", new: false },
    ];

    //카테고리 변환
    const convertCategory = (category: string) => {
        switch (category) {
            case "tops": return "상의";
            case "pants": return "하의";
            case "shoes": return "신발";
            case "accessories": return "액세서리";
            default: return "";
        }
    };

    //필터링
    let filtered = products.filter((p) => {
        if (category !== "all" && p.category !== convertCategory(category)) return false;
        if (p.price < Number(minPrice) || p.price > Number(maxPrice)) return false;
        if (onlyNew && !p.new) return false;
        return true;
    });

    //정렬
    if (sort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="bg-[#333333] p-4 rounded-xl text-white">
            <div className="flex flex-row items-center justify-between mb-4">
                <h1 className="text-lg font-bold">상품 목록</h1>
                <p className="text-sm text-gray-400">
                    총 {filtered.length}개 상품
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {filtered.map((product) => (
                    <div
                        key={product.id}
                        className="p-4 bg-[#444444] border border-[#4a4a4a] rounded-xl"
                    >
                        {/* 상품명 + NEW */}
                        <div className="flex items-center justify-between">
                            <p className="font-bold">{product.name}</p>

                            {product.new && (
                                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-md">
                                    NEW
                                </span>
                            )}
                        </div>

                        {/* 카테고리 + 가격 */}
                        <div className="mt-2 flex flex-col gap-1">
                            <p className="text-sm text-gray-400">
                                {product.category}
                            </p>
                            <p className="font-bold">
                                {product.price.toLocaleString()}원
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}