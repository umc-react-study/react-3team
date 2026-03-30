import { useState, useEffect } from 'react'

import { useInView } from 'react-intersection-observer'
import Logo from '../assets/Logo.png'
import { useInfiniteNowPlayingMovies, useInfinitePopularMovies, useInfiniteTopRatedMovies, useInfiniteUpcomingMovies } from '../hooks/queries/useGetInfiniteMovies'


const NAV_TABS = ['현재 상영작', '인기', '높은 평점', '출시 예정'] as const
type NavTab = (typeof NAV_TABS)[number]

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'

function MovieCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="bg-gray-200 rounded aspect-2/3 w-full" />
      <div className="mt-1 h-3 bg-gray-200 rounded w-3/4" />
      <div className="mt-1 h-6 bg-gray-200 rounded" />
    </div>
  )
}

function useInfiniteMoviesByTab(tab: NavTab) {
  const nowPlaying = useInfiniteNowPlayingMovies()
  const popular = useInfinitePopularMovies()
  const topRated = useInfiniteTopRatedMovies()
  const upcoming = useInfiniteUpcomingMovies()

  switch (tab) {
    case '현재 상영작': return nowPlaying
    case '인기': return popular
    case '높은 평점': return topRated
    case '출시 예정': return upcoming
  }
}

function TanstackQuery() {
  const [activeTab, setActiveTab] = useState<NavTab>('현재 상영작')
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMoviesByTab(activeTab)
  // ref -> 특정 HTML 요소를 감시할 수 있다.
  // inView -> 감시 중인 요소가 화면에 보이면 true 
  const { ref: observerRef, inView } = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const movies = data?.pages.map((page) => page.results).flat() ?? []

  return (
    <div className="flex flex-col min-h-screen bg-white text-sm">
      <header className="flex items-center border-b border-gray-200 px-4 py-2 gap-5 sticky top-0 bg-white z-10">
        <img src={Logo} alt="CGV" className="h-8 mr-2" />
        <nav className="flex gap-2 flex-1">
          {NAV_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                tab === activeTab
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-gray-500">
          <button className="hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM16 7a4 4 0 00-8 0" />
            </svg>
          </button>

          <button className="hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <button className="hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 12a7.5 7.5 0 0012.15 4.65z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-48 border-r border-gray-200 flex flex-col">
          <div className="flex flex-col px-4 pt-4 gap-1">

            <button className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              홈
            </button>

            <button className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              씨네톡
            </button>

            <button className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              예매·예약
            </button>

            <button className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              매점
            </button>

            <button className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              더보기
            </button>
          </div>

          <hr className="mx-4 my-2 border-gray-200" />
          <div className="flex flex-col px-4 gap-1">
            <button className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              상영관 찾기
            </button>

            <button className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              특별관
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <section className="mb-10">
            <h2 className="text-base font-bold mb-4">{activeTab}</h2>

            {isError && (
              <p className="text-red-500">데이터를 불러오지 못했습니다.</p>
            )}

            <div className="grid grid-cols-5 gap-3">
              {isLoading
                ? Array.from({ length: 10 }).map((_, i) => <MovieCardSkeleton key={i} />)
                : movies.map((movie, index) => (
                    <div key={`${index}-${movie.id}`} className="flex flex-col">
                      <div className="relative bg-gray-200 rounded overflow-hidden aspect-2/3 w-full">
                        {movie.poster_path ? (
                          <img
                            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                        {movie.adult && (
                          <span className="absolute top-1 left-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            19
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-gray-800 text-xs truncate font-bold">{movie.title}</p>
                      <button className="mt-1 border border-gray-300 py-1 rounded text-gray-700 text-xs hover:bg-gray-100 transition-colors cursor-pointer">
                        예매하기
                      </button>
                    </div>
                  ))}

              {isFetchingNextPage &&
                Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={`next-${i}`} />)}
            </div>

            <div ref={observerRef} className="h-4" />
          </section>

        </main>
      </div>
    </div>
  )
}

export default TanstackQuery
