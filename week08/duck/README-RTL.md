# React Testing Library(RTL) 가이드

이 문서는 `week08/duck` 예제를 기준으로 React Testing Library(RTL)를 왜 쓰는지, 어떤 원칙으로 테스트를 작성하는지, 그리고 자주 쓰는 패턴을 정리합니다.

## RTL을 쓰는 이유

- **사용자 관점 검증**: 컴포넌트 내부 구현(상태 변수, 내부 함수)보다 화면에 보이는 결과를 검증합니다.
- **리팩터링 내성**: 내부 구현이 바뀌어도 사용자 경험이 같다면 테스트가 덜 깨집니다.
- **접근성 친화적 테스트**: `getByRole`, `getByLabelText` 같은 쿼리로 접근성 품질까지 함께 챙기기 쉽습니다.

## 이 프로젝트에서의 RTL 사용 위치

- 컴포넌트 테스트: `src/components/DuckCard.test.tsx`
- 통합 테스트: `src/components/DuckList.integration.test.tsx`
- 공통 설정: `src/test/setup.ts` (`jest-dom`, `cleanup`, MSW 생명주기)

## 핵심 개념

### 1) `render`와 `screen`

`render`로 컴포넌트를 DOM에 올리고, `screen`으로 요소를 찾습니다.

```tsx
import { render, screen } from '@testing-library/react'

render(<DuckCard duck={mallard} />)
expect(screen.getByRole('heading', { name: '청둥오리' })).toBeInTheDocument()
```

### 2) 쿼리 선택 우선순위

권장 순서는 보통 아래와 같습니다.

1. `getByRole` (name 옵션 함께)
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (마지막 수단)

이 예제에서도 가능한 곳은 역할 기반 쿼리를 사용하고, 필요한 경우에만 `data-testid`를 사용합니다.

## `getBy` / `findBy` / `queryBy` 차이

- `getBy*`: 즉시 찾고, 없으면 바로 실패 (동기 화면에 적합)
- `findBy*`: 일정 시간 기다렸다가 찾고, 없으면 실패 (비동기 UI에 적합)
- `queryBy*`: 없으면 `null` 반환 (부재 검증에 적합)

```tsx
// 로딩 이후 나타나는 요소
expect(await screen.findByRole('list', { name: '오리 목록' })).toBeInTheDocument()
```

## 이 저장소 기준 테스트 패턴

### 컴포넌트 테스트 (얇은 테스트)

`DuckCard`처럼 입력(props)과 출력(UI)이 명확한 컴포넌트는 빠르게 검증합니다.

```tsx
render(<DuckCard duck={mallard} />)
expect(screen.getByRole('heading', { name: mallard.name })).toBeInTheDocument()
expect(screen.getByText(mallard.species)).toBeInTheDocument()
```

### 통합 테스트 (흐름 테스트)

`DuckList`처럼 API 호출과 상태 전이가 있는 컴포넌트는 흐름 중심으로 검증합니다.

```tsx
render(<DuckList />)
expect(screen.getByRole('status')).toHaveTextContent('불러오는 중')
expect(await screen.findByRole('list', { name: '오리 목록' })).toBeInTheDocument()
```

MSW와 함께 쓰면 성공/빈 목록/에러 시나리오를 안정적으로 재현할 수 있습니다.

## jest-dom 매처

`src/test/setup.ts`에서 `@testing-library/jest-dom/vitest`를 등록해 아래 같은 가독성 좋은 단언을 사용합니다.

- `toBeInTheDocument()`
- `toHaveTextContent()`
- `toBeVisible()`
- `toHaveAttribute()`

## 좋은 RTL 테스트 작성 팁

- **행동/결과 중심**으로 테스트 이름을 작성합니다.  
  예: `API 오류 시 에러 메시지를 보여준다`
- 너무 많은 구현 디테일 검증은 피합니다. (state 값 직접 검증 등)
- 비동기 변화는 `findBy*` 또는 `waitFor`를 사용합니다.
- 한 테스트는 한 사용자 시나리오에 집중합니다.

## 함께 보면 좋은 문서

- RTL 공식 문서: [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- 이 프로젝트 MSW 문서: [README-MSW.md](./README-MSW.md)
