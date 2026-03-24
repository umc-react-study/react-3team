import { useSettings } from "../../stores/context/SettingsContext";

export default function NotificationFeed() {
  const { state } = useSettings();

  const isKo = state.language === "ko";

  const notifications = isKo
    ? ["오늘 주문 3건이 배송 준비 중입니다.", "찜한 상품 1개가 할인 중입니다.", "신규 쿠폰이 도착했습니다."]
    : ["3 orders are being prepared for shipping.", "1 wishlist item is now on sale.", "A new coupon has arrived."];

  return (
    <section className="rounded-2xl border border-white/10 bg-[#2a2a2a] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{isKo ? "알림 피드" : "Notification Feed"}</h3>

        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
          {state.notificationsEnabled ? (isKo ? "수신 중" : "Active") : isKo ? "꺼짐" : "Off"}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {state.notificationsEnabled ? (
          notifications.map((item, index) => (
            <div key={index} className="rounded-xl border border-white/5 bg-[#333333] px-4 py-3 text-sm text-slate-200">
              {item}
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-white/5 bg-[#333333] px-4 py-3 text-sm text-slate-400">
            {isKo
              ? "알림이 비활성화되어 새 알림을 표시하지 않습니다."
              : "Notifications are disabled, so no new alerts are shown."}
          </div>
        )}
      </div>
    </section>
  );
}
