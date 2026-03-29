import { useFilterStore } from '../store/useFilterStore'

const CATEGORIES = ['전체', '상의', '하의', '신발', '액세서리']
const SORTS = ['신상품 우선', '가격 낮은순', '가격 높은순']
const inputCls = 'bg-[#1a1a2e] border border-gray-600 text-gray-200 p-2 rounded-xl text-sm'

function Zustand() {
  const { category, sort, minPrice, maxPrice, onlyNew, setFilter, reset, getFilteredProducts } = useFilterStore()
  const products = getFilteredProducts()

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-gray-200 p-6 font-sans">

      <div className="bg-[#2a2a3e] rounded-lg p-5 mb-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">필터 컨트롤</span>
          <button onClick={reset} className="border border-gray-500 text-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-600 cursor-pointer">
            초기화
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-gray-400">카테고리</label>
            <select value={category} onChange={(e) => setFilter({ category: e.target.value })} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-gray-400">정렬</label>
            <select value={sort} onChange={(e) => setFilter({ sort: e.target.value })} className={inputCls}>
              {SORTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-gray-400">최소 가격</label>
            <input type="text" value={minPrice} onChange={(e) => setFilter({ minPrice: Number(e.target.value) })} className={inputCls} />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-gray-400">최대 가격</label>
            <input type="text" value={maxPrice} onChange={(e) => setFilter({ maxPrice: Number(e.target.value) })} className={inputCls} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={onlyNew} onChange={(e) => setFilter({ onlyNew: e.target.checked })} />
          신상품만 보기
        </label>
      </div>

      <div className="bg-[#2a2a3e] rounded-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white font-bold">상품 목록</span>
          <span className="text-sm text-gray-400">총 {products.length}개</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map(({ id, name, category, price, isNew }) => (
            <div key={id} className="bg-[#1a1a2e] rounded-md p-4 flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-sm">{name}</span>
                {isNew && <span className="bg-[#6c63ff] text-white text-xs px-2 py-0.5 rounded">NEW</span>}
              </div>
              <span className="text-xs text-gray-500">카테고리: {category}</span>
              <span className="text-sm text-gray-200 font-bold">{price.toLocaleString()}원</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Zustand
