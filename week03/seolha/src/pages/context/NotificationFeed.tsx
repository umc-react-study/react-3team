import { useSettings } from "../../store/context/SettingsContext";

export default function NotificationFeed() {
    const { notification, language } = useSettings();

    const text = {
        ko: {
            title: "알림 피드",
            on: "수신 중",
            off: "수신 중지",
            offMessage: "알림이 꺼져 있습니다. 설정 패널에서 알림을 켜주세요.",
            notifications: [
                "오늘 주문 3건이 배송 준비 중입니다.",
                "찜한 상품 1개가 할인 중입니다.",
                "신규 쿠폰이 도착했습니다."
            ]
        },
        en: {
            title: "Notification Feed",
            on: "Receiving",
            off: "Stopped",
            offMessage: "Notifications are turned off. Please enable them in settings.",
            notifications: [
                "3 orders are being prepared for shipping.",
                "1 item in your wishlist is on sale.",
                "A new coupon has arrived."
            ]
        }
    };

    const currentText = text[language];

    return (
        <div className="text-white bg-[#2d2d2d] border border-[#4a4a4a] p-4 rounded-2xl">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-xl font-bold">{currentText.title}</h1>

                <p className={notification 
                    ? "bg-green-500/20 text-green-500 px-4 py-2 rounded-xl" 
                    : "bg-red-500/20 text-red-500 px-4 py-2 rounded-xl"}
                >
                    {notification ? currentText.on : currentText.off}
                </p>
            </div>

            {notification ? (
                <div>
                    {currentText.notifications.map((msg, idx) => (
                        <div key={idx} className="mt-4 text-sm bg-[#383838] border border-[#4a4a4a] p-4 rounded-xl">
                            {msg}
                        </div>
                    ))}
                </div>  
            ) : (
                <div className="mt-4 text-sm text-gray-500">
                    {currentText.offMessage}
                </div>
            )}
        </div>
    );
}