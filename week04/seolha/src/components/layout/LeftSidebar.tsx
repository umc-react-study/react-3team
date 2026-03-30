import logoCGV from '../../assets/icons/cgv.svg'
import {
    Home,
    Ticket,
    CreditCard,
    Popcorn,
    MoreHorizontal,
    MapPin,
    BadgePercent
} from 'lucide-react'

export default function LeftSidebar() {
    return (
        <div className="w-56 h-dvh text-[#444444] px-8">
            <img src={logoCGV} alt="logo" className="w-24 h-16 mb-4" />

            <ul className="flex flex-col gap-4 mt-4">

                {/* Home (선택됨) */}
                <li className="flex items-center gap-3 font-semibold">
                    <Home className="w-5 h-5" />
                    <span>홈</span>
                </li>

                <li className="flex items-center gap-3 text-gray-400">
                    <Ticket className="w-5 h-5" />
                    <span>씨네톡</span>
                </li>

                <li className="flex items-center gap-3 text-gray-400">
                    <CreditCard className="w-5 h-5" />
                    <span>예매·예약</span>
                </li>

                <li className="flex items-center gap-3 text-gray-400">
                    <Popcorn className="w-5 h-5" />
                    <span>매점</span>
                </li>

                <li className="flex items-center gap-3 text-gray-400">
                    <MoreHorizontal className="w-5 h-5" />
                    <span>더보기</span>
                </li>

                {/* 구분선 */}
                <div className="border-1 border-gray-300 my-2"></div>

                <li className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <span>상영관 찾기</span>
                </li>

                <li className="flex items-center gap-3 text-gray-400">
                    <BadgePercent className="w-5 h-5 text-red-400" />
                    <span>특별관</span>
                </li>

            </ul>
        </div>
    )
}