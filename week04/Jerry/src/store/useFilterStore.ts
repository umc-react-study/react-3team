import { create } from 'zustand'

export interface Product {
  id: number
  name: string
  category: string
  price: number
  isNew: boolean
}

// 데이터 
const ALL_PRODUCTS: Product[] = [
  { id: 1, name: '베이직 반팔 티', category: '상의', price: 19000, isNew: true },
  { id: 2, name: '러닝 스니커즈', category: '신발', price: 89000, isNew: true },
  { id: 3, name: '스트라이프 셔츠', category: '상의', price: 42000, isNew: true },
  { id: 4, name: '와이드 데님 팬츠', category: '하의', price: 49000, isNew: false },
  { id: 5, name: '미니 크로스백', category: '액세서리', price: 39000, isNew: false },
  { id: 6, name: '코튼 조거 팬츠', category: '하의', price: 36000, isNew: false },
]

// 페이지 초깃값 (리셋 시에도 사용)
const INITIAL = { category: '전체', sort: '신상품 우선', minPrice: 0, maxPrice: 100000, onlyNew: false }

interface FilterState {
  // 상태 
  category: string
  sort: string
  minPrice: number
  maxPrice: number
  onlyNew: boolean

  // 액션 
  setFilter: (patch: Partial<typeof INITIAL>) => void // initial type을 가져오되, partial로 모든 키를 optional 하게 설정 
  reset: () => void
  getFilteredProducts: () => Product[]
}

export const useFilterStore = create<FilterState>((set, get) => ({
  ...INITIAL,

  setFilter: (patch) => set(patch),
  reset: () => set(INITIAL),

  getFilteredProducts: () => {
    // 현재 상태 읽기(get)
    const { category, sort, minPrice, maxPrice, onlyNew } = get()
    // Record(key, value) 형태 반환: string -> (a:product, b:product)로 number 반환(정렬)
    const sorters: Record<string, (a: Product, b: Product) => number> = {
      // array.sort() 이용 → sort((a, b) => ) 음수인 경우 a가 앞으로, 양수인 경우 b가 앞으로 
      '신상품 우선': (a, b) => Number(b.isNew) - Number(a.isNew), // isNew: 1/0 
      '가격 낮은순': (a, b) => a.price - b.price,
      '가격 높은순': (a, b) => b.price - a.price,
    }
    return ALL_PRODUCTS
      .filter((p) =>
        // 전체이거나 카테고리가 일치하거나
        (category === '전체' || p.category === category) &&
        // 가격 범위 안에 있고
        p.price >= minPrice && p.price <= maxPrice &&
        // 신상품 체크인지 아닌지 
        (!onlyNew || p.isNew)
      )
      .sort(sorters[sort])
  },
}))
