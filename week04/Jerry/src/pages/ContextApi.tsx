import { SettingsProvider, useSettings } from '../context/SettingsContext'

function Content() {
  const { theme, language, notifications, setTheme, setLanguage, setNotifications, reset } = useSettings()
  const isDark = theme === 'dark'
  const isKo = language === 'ko'

  const bg    = isDark ? 'bg-[#1a1a2e]' : 'bg-gray-100'
  const card  = isDark ? 'bg-[#2a2a3e]' : 'bg-white'
  const inner = isDark ? 'bg-[#1a1a2e]' : 'bg-gray-100'
  const text  = isDark ? 'text-gray-100' : 'text-gray-800'
  const sub   = isDark ? 'text-gray-400' : 'text-gray-500'

  const notifs = isKo
    ? ['오늘 주문 3건이 배송 준비 중입니다.', '관심 상품 1개가 할인 중입니다.', '신규 쿠폰이 도착했습니다.']
    : ['3 orders are being prepared for shipping.', '1 wishlist item is now on sale.', 'A new coupon has arrived.']

  return (
    <div className={`min-h-screen ${bg} ${text} p-6 font-sans`}>
      {/* 상단 배지 */}
      <div className="flex gap-3 mb-5">
        <div className={`${isDark ? 'bg-[#2a2a3e]' : 'bg-blue-100'} rounded-lg px-4 py-3 flex-1`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-blue-400'}`}>Theme</p>
          <p className="font-bold">{isDark ? 'Dark' : 'Light'}</p>
        </div>
        <div className={`${isDark ? 'bg-[#3b3970]' : 'bg-indigo-100'} rounded-lg px-4 py-3 flex-1`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-indigo-400'}`}>Language</p>
          <p className="font-bold">{isKo ? '한국어' : 'English'}</p>
        </div>
        <div className={`${isDark ? 'bg-[#4a2a6e]' : 'bg-purple-100'} rounded-lg px-4 py-3 flex-1`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-purple-400'}`}>Notifications</p>
          <p className="font-bold">{notifications ? 'Enabled' : 'Disabled'}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-4 flex-1">
          {/* 설정 패널 */}
          <div className={`${card} rounded-lg p-4`}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">{isKo ? '설정 패널' : 'Settings Panel'}</span>
              <button onClick={reset} className="text-xs border border-gray-500 px-3 py-1 rounded hover:bg-gray-600 cursor-pointer">
                {isKo ? '기본값 복원' : 'Restore Defaults'}
              </button>
            </div>
            <div className="flex gap-3">
              <div className={`${inner} rounded p-3 flex-1`}>
                <p className={`text-xs ${sub} mb-1`}>{isKo ? '테마' : 'Theme'}</p>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
                  className={`${inner} ${text} text-sm w-full outline-none cursor-pointer`}
                >
                  <option value="dark">{isKo ? '다크' : 'Dark'}</option>
                  <option value="light">{isKo ? '라이트' : 'Light'}</option>
                </select>
              </div>
              <div className={`${inner} rounded p-3 flex-1`}>
                <p className={`text-xs ${sub} mb-1`}>{isKo ? '언어' : 'Language'}</p>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'ko' | 'en')}
                  className={`${inner} ${text} text-sm w-full outline-none cursor-pointer`}
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className={`${inner} rounded p-3 flex-1`}>
                <p className={`text-xs ${sub} mb-1`}>{isKo ? '알림' : 'Notifications'}</p>
                <select
                  value={String(notifications)}
                  onChange={(e) => setNotifications(e.target.value === 'true')}
                  className={`${inner} ${text} text-sm w-full outline-none cursor-pointer`}
                >
                  <option value="true">{isKo ? '켜짐' : 'On'}</option>
                  <option value="false">{isKo ? '꺼짐' : 'Off'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* 미리보기 카드 */}
          <div className={`${card} rounded-lg p-4`}>
            <p className="font-bold mb-3">{isKo ? '미리보기 카드' : 'Preview Card'}</p>
            <div className={`${inner} rounded p-4`}>
              <p className="font-bold mb-1">{isKo ? '현재 테마' : 'Current Theme'}: {isDark ? 'Dark' : 'Light'}</p>
              <p className={`text-sm ${sub} mb-1`}>
                {isKo ? 'Context에서 가져온 설정을 UI에 반영합니다.' : 'Applying settings from Context to the UI.'}
              </p>
              <p className="text-sm">{isKo ? '알림 상태' : 'Notifications'}: {notifications ? 'ON' : 'OFF'}</p>
            </div>
          </div>
        </div>

        {/* 알림 피드 */}
        <div className={`${card} rounded-lg p-4 flex-1`}>
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">{isKo ? '알림 피드' : 'Notification Feed'}</span>
            {notifications && (
              <span className="text-xs bg-green-600 px-2 py-0.5 rounded">{isKo ? '수신 중' : 'Active'}</span>
            )}
          </div>
          {notifications ? (
            <div className="flex flex-col gap-2">
              {notifs.map((n, i) => (
                <div key={i} className={`${inner} rounded p-3 text-sm`}>{n}</div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${sub}`}>{isKo ? '알림이 꺼져 있습니다.' : 'Notifications are off.'}</p>
          )}
          <p className={`text-xs ${sub} mt-4`}>
            {isKo ? '공유 상태' : 'Shared State'}: theme={theme} | language={language} | notifications={String(notifications)}
          </p>
        </div>
      </div>
    </div>
  )
}

function ContextApi() {
  return (
    <SettingsProvider>
      <Content />
    </SettingsProvider>
  )
}

export default ContextApi
