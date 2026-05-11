import type { Duck } from '../types/duck'

function apiBase(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'http://localhost'
}

export async function fetchDucks(): Promise<Duck[]> {
  const res = await fetch(`${apiBase()}/api/ducks`)
  if (!res.ok) {
    throw new Error(`오리 목록을 불러오지 못했습니다 (${res.status})`)
  }
  return (await res.json()) as Duck[]
}
