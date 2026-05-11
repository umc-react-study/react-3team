/**
 * 컴포넌트 테스트: 단일 UI 단위(DuckCard)만 props 기준으로 검증한다.
 * 네트워크·부모 상태 없이 빠르게 실패 지점을 좁힌다.
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Duck } from '../types/duck'
import { DuckCard } from './DuckCard'

const mallard: Duck = {
  id: 'm-1',
  name: '청둥오리',
  species: 'Anas platyrhynchos',
}

describe('DuckCard', () => {
  it('이름과 종을 표시한다', () => {
    render(<DuckCard duck={mallard} />)

    expect(screen.getByRole('heading', { name: mallard.name })).toBeInTheDocument()
    expect(screen.getByText(mallard.species)).toBeInTheDocument()
    expect(screen.getByTestId(`duck-card-${mallard.id}`)).toBeInTheDocument()
  })
})
