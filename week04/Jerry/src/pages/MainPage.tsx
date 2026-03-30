import { Link } from 'react-router-dom'

const links = [
  {
    to: '/zustand',
    label: 'Zustand',
    description: '경량 전역 상태 관리',
    color: 'from-orange-400 to-pink-500',
    emoji: '🐻',
  },
  {
    to: '/redux',
    label: 'Redux',
    description: '예측 가능한 상태 컨테이너',
    color: 'from-purple-500 to-indigo-600',
    emoji: '🔄',
  },
  {
    to: '/context-api',
    label: 'Context API',
    description: 'React 내장 상태 공유',
    color: 'from-teal-400 to-cyan-500',
    emoji: '⚛️',
  },
  {
    to: '/tanstack-query',
    label: 'TanStack Query',
    description: '서버 상태 관리 및 캐싱',
    color: 'from-green-400 to-blue-500',
    emoji: '📊',
  }
]

function MainPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* 헤더 */}
        <div className="text-center">
          <div className="text-5xl mb-4">⚡</div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            React 중급 과제
          </h1>
          <p className="mt-2 text-slate-400 text-sm">React 3팀</p>
        </div>

        {/* 링크 카드들 */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {links.map(({ to, label, description, color, emoji }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`bg-gradient-to-r ${color} p-px rounded-2xl`}>
                <div className="bg-slate-900 rounded-2xl px-6 py-4 flex items-center gap-4 group-hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">{emoji}</span>
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg leading-tight">{label}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{description}</div>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-slate-600 text-xs">Team 3 · 2025</p>
      </div>
    </div>
  )
}

export default MainPage
