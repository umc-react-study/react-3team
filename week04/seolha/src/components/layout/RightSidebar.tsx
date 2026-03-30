import barcode from '../../assets/img/barcode.png'

export default function RightSidebar() {
    return (
        <div className="w-60 h-dvh flex flex-col justify-end p-4">
            <div className="bg-gray-600 p-4 rounded-lg h-64 text-white">
                <h1 className = "text-lg font-semibold pb-2">네가 마지막으로 남긴 노래</h1>
                <p>둘만의 비밀! <br/> 오직 둘만의 언어</p>
                <button 
                    className="mt-4 border border-white text-white px-4 py-2 rounded-3xl 
                    hover:bg-white hover:text-gray-800 hover:cursor-pointer"
                >
                        자세히 보기 {'>'}
                </button>
            </div>
            <div className="bg-gray-100 text-[#444444] flex flex-row gap-4 items-center justify-between p-4 rounded-lg h-30 mt-6">
                <div>
                    <p className = "text-sm font-semibold pb-2">
                        QR 코드로 <br/> 자세히 보기
                    </p>
                    <p className="text-sm text-gray-500">
                        QR코드 스캔
                    </p>
                </div>
                <img src={barcode} alt="barcode" className="w-16 h-16 mt-2" />
            </div>
        </div>
    )
}