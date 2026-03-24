import { useFilterStore } from "../../store/zustand/filterstore";

export default function FilterControl() {
    const {
        category,
        sort,
        minPrice,
        maxPrice,
        onlyNew,
        setCategory,
        setSort,
        setMinPrice,
        setMaxPrice,
        setOnlyNew,
        reset,
    } = useFilterStore();

    return (
        <div className="bg-[#333333] p-4 rounded-xl text-white">
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-lg font-bold">필터 컨트롤</h1>
                <button
                    onClick={reset} 
                    className="bg-[#555555] hover:bg-[#666666] text-white py-2 px-4 rounded-xl"
                >
                    초기화
                </button>
            </div>

            {/* 카테고리 / 정렬 */}
            <div className="flex flex-row gap-4">
                <div className="w-full flex flex-col gap-2">
                    <p className="text-sm text-blue-400 pl-2">카테고리</p>
                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value as any)
                        }
                        className="bg-[#1a1a1a] w-full border border-[#4a4a4a] rounded-xl p-2"
                    >
                        <option value="all">전체</option>
                        <option value="tops">상의</option>
                        <option value="pants">하의</option>
                        <option value="shoes">신발</option>
                        <option value="accessories">악세사리</option>
                    </select>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <p className="text-sm text-blue-400 pl-2">정렬</p>
                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value as any)
                        }
                        className="bg-[#1a1a1a] w-full border border-[#4a4a4a] rounded-xl p-2"
                    >
                        <option value="newest">최신순</option>
                        <option value="price-low">가격 낮은순</option>
                        <option value="price-high">가격 높은순</option>
                    </select>
                </div>
            </div>

            {/* 가격 */}
            <div className="flex flex-row gap-4 mt-4">
                <div className="w-full flex flex-col gap-2">
                    <p className="text-sm text-blue-400 pl-2">최소 가격</p>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) =>
                            setMinPrice(e.target.value)
                        }
                        className="bg-[#1a1a1a] w-full border border-[#4a4a4a] rounded-xl p-2"
                    />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <p className="text-sm text-blue-400 pl-2">최대 가격</p>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(e.target.value)
                        }
                        className="bg-[#1a1a1a] w-full border border-[#4a4a4a] rounded-xl p-2"
                    />
                </div>
            </div>

            {/* 체크박스 */}
            <div className="mt-3 flex items-center">
                <input
                    type="checkbox"
                    id="new"
                    checked={onlyNew}
                    onChange={(e) =>
                        setOnlyNew(e.target.checked)
                    }
                    className="w-4 h-4 text-blue-500 bg-[#1a1a1a] border-[#4a4a4a] rounded focus:ring-blue-500"
                />
                <label htmlFor="new" className="ml-2 text-sm text-blue-400">
                    신상품만 보기
                </label>
            </div>
        </div>
    );
}