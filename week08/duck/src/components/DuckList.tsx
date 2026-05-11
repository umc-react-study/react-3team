import { useEffect, useState } from 'react'
import { fetchDucks } from '../api/ducks'
import type { Duck } from '../types/duck'
import { DuckCard } from './DuckCard'

export function DuckList() {
  const [ducks, setDucks] = useState<Duck[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setMessage(null)

    fetchDucks()
      .then((data) => {
        if (cancelled) return
        setDucks(data)
        setStatus('success')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setDucks([])
        setStatus('error')
        setMessage(err instanceof Error ? err.message : '알 수 없는 오류')
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'loading') {
    return <p role="status">불러오는 중…</p>
  }

  if (status === 'error') {
    return (
      <p role="alert" className="error">
        {message ?? '오류가 발생했습니다.'}
      </p>
    )
  }

  if (ducks.length === 0) {
    return <p>등록된 오리가 없습니다.</p>
  }

  return (
    <ul className="duck-list" aria-label="오리 목록">
      {ducks.map((duck) => (
        <li key={duck.id}>
          <DuckCard duck={duck} />
        </li>
      ))}
    </ul>
  )
}
