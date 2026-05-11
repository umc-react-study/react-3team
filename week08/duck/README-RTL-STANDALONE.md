# React Testing Library 단독 예제

이 문서는 특정 프로젝트 구조를 전제로 하지 않고, **새로운 예제 코드**로 React Testing Library(RTL) 핵심 개념을 설명합니다.

## 1) 컴포넌트 코드

아래 컴포넌트는 버튼을 누르면 숫자가 증가합니다.

```tsx
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <section>
      <h1>카운터</h1>
      <p aria-label="현재 값">{count}</p>
      <button onClick={() => setCount((v) => v + 1)}>증가</button>
    </section>
  )
}
```

## 2) 테스트 코드

핵심은 "내부 state"를 직접 확인하지 않고, **사용자가 보는 화면 변화**를 검증하는 것입니다.

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Counter } from './Counter'

describe('Counter', () => {
  it('초기값 0을 보여준다', () => {
    render(<Counter />)
    expect(screen.getByLabelText('현재 값')).toHaveTextContent('0')
  })

  it('증가 버튼을 누르면 값이 1이 된다', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: '증가' }))

    expect(screen.getByLabelText('현재 값')).toHaveTextContent('1')
  })
})
```

## 3) 왜 이런 방식이 좋은가?

- **사용자 중심**: 버튼 클릭, 텍스트 표시처럼 실제 사용 흐름을 검증합니다.
- **유지보수성**: 내부 구현(`useState`를 다른 방식으로 바꿈)이 바뀌어도 화면 동작이 같으면 테스트가 유지됩니다.
- **접근성 개선 유도**: `getByRole`, `getByLabelText`를 쓰면 자연스럽게 접근성 좋은 마크업을 작성하게 됩니다.

## 4) 자주 쓰는 쿼리 정리

- `getBy...`: 즉시 찾아야 하는 요소 (없으면 바로 실패)
- `findBy...`: 비동기 후 나타나는 요소 (`await` 필요)
- `queryBy...`: 없어야 하는 요소 확인 (없으면 `null`)

예시:

```tsx
// 즉시 있어야 함
screen.getByRole('heading', { name: '카운터' })

// 나중에 나타남
await screen.findByText('저장 완료')

// 없어야 함
expect(screen.queryByText('에러')).not.toBeInTheDocument()
```

## 5) 실행 최소 설정

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

```ts
// src/test/setup.ts
import '@testing-library/jest-dom/vitest'
```

이 두 설정이 있으면 RTL + jest-dom 매처(`toBeInTheDocument`, `toHaveTextContent`)를 바로 사용할 수 있습니다.

## 6) 테스트 커버리지(coverage)

커버리지는 "테스트가 코드를 얼마나 실행했는가"를 보여주는 지표입니다.

- **Statements**: 실행 가능한 문장이 얼마나 실행됐는지
- **Branches**: `if/else`, `switch`, 삼항 연산자 분기까지 얼마나 탔는지
- **Functions**: 함수가 얼마나 호출됐는지
- **Lines**: 코드 라인 기준 실행 비율

중요한 점은 **커버리지가 높아도 버그가 없다는 뜻은 아니다**라는 것입니다.  
커버리지는 "테스트 안 된 영역을 찾는 지도"로 쓰는 것이 가장 좋습니다.

### 커버리지 설정 예시

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}', // 테스트 파일 자체 제외
        'src/test/**',            // 테스트 유틸 제외
      ],
    },
  },
})
```

### 실행 명령 예시

```bash
npm run test:coverage
```

보통 아래처럼 스크립트를 추가해 둡니다.

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

### 리포트 읽는 법

- 콘솔의 `% Branch`가 낮으면, 성공 케이스만 테스트했을 가능성이 큽니다.
- HTML 리포트에서 빨간 줄(미실행)을 보고 테스트 케이스를 보강합니다.
- 우선순위는 "핵심 비즈니스 로직"부터 높입니다. 단순 UI 껍데기 파일은 후순위로 둬도 됩니다.

### 실무 팁

- 목표 수치는 팀 합의로 정하되, 숫자만 올리려고 의미 없는 테스트를 만들지 않습니다.
- 실패/예외/빈 데이터 같은 **엣지 케이스**를 추가하면 Branch 커버리지가 빠르게 좋아집니다.
- PR에서 커버리지 변화(증가/감소)를 같이 보면 회귀를 빨리 잡을 수 있습니다.
