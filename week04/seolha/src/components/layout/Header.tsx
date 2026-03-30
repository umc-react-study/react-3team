import { useSearchParams } from 'react-router-dom'
import logoCGV from '../../assets/icons/cgv.svg'
import { useEffect } from 'react'
import { Search, Bell } from 'lucide-react'

export default function Header() {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentCategory = searchParams.get('category')

    const handleClick = (category: string) => {
        setSearchParams({ category })
    }

    const getClassName = (category: string) =>
        currentCategory === category
            ? 'bg-[#444444] text-white px-6 p-2 rounded-3xl'
            : 'bg-gray-100 p-2 px-4 rounded-3xl'

    useEffect(() => {
        if (!searchParams.get('category')) {
            setSearchParams({ category: 'now_playing' })
        }
    }, [])

    return (
        <header className="w-[600px] mx-auto bg-white text-[#444444] flex flex-col sticky top-0 z-20">
            
            {/* 아이콘 메뉴 */}
            <div className="flex items-center justify-between w-full px-4">
                <img src={logoCGV} alt="logo" className="w-16 h-16 lg:invisible" />

                <div className="flex items-center gap-4">
                    <Search className="w-5 h-5 cursor-pointer" />
                    <Bell className="w-5 h-5 cursor-pointer" />
                </div>
            </div>

            {/* 카테고리 */}
            <div className="flex items-center justify-center gap-4 font-semibold mb-4 px-4">
                <button onClick={() => handleClick('now_playing')} className={getClassName('now_playing')}>
                    현재상영작
                </button>

                <button onClick={() => handleClick('upcoming')} className={getClassName('upcoming')}>
                    상영예정작
                </button>

                <button onClick={() => handleClick('popular')} className={getClassName('popular')}>
                    인기영화
                </button>

                <button onClick={() => handleClick('top_rated')} className={getClassName('top_rated')}>
                    높은평점
                </button>
            </div>
        </header>
    )
}