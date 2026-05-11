/**
 * 통합 테스트: API(fetch) + 로딩/에러/성공 상태 + 자식 DuckCard까지 함께 검증한다.
 * MSW로 HTTP를 고정해 실제 서버 없이 사용자 관점 시나리오를 재현한다.
 */
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { server } from '../mocks/server'
import { emptyDucksHandler, errorDucksHandler } from '../mocks/handlers'
import { DuckList } from './DuckList'

describe('DuckList (integration)', () => {
  it('로딩 후 목록을 렌더링한다', async () => {
    render(<DuckList />)

    expect(screen.getByRole('status')).toHaveTextContent('불러오는 중')

    expect(await screen.findByRole('list', { name: '오리 목록' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: '청둥오리' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '원앙' })).toBeInTheDocument()
  })

  it('빈 배열이면 안내 문구를 보여준다', async () => {
    server.use(emptyDucksHandler)
    render(<DuckList />)

    await waitFor(() => {
      expect(screen.getByText('등록된 오리가 없습니다.')).toBeInTheDocument()
    })
  })

  it('API 오류 시 에러 메시지를 보여준다', async () => {
    server.use(errorDucksHandler)
    render(<DuckList />)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('오리 목록을 불러오지 못했습니다 (500)')
  })
})
