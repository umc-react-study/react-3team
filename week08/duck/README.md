# duck

React(Vite) 환경에서 **Vitest**, **React Testing Library**, **MSW(Mock Service Worker)**, **테스트 커버리지**를 한데 묶어 실습하는 예제 프로젝트입니다.

## 포함된 내용

| 주제 | 이 프로젝트에서의 위치 |
|------|------------------------|
| Vitest + React Testing Library | `src/**/*.test.tsx`, `vitest.config.ts`, `src/test/setup.ts` |
| 컴포넌트 테스트 vs 통합 테스트 | `DuckCard.test.tsx`(단위) / `DuckList.integration.test.tsx`(통합) |
| MSW로 API 모킹 | `src/mocks/handlers.ts`, 테스트용 `server.ts`, 개발용 `browser.ts` |
| 커버리지 전략 | `vitest.config.ts`의 `coverage` 설정과 상단 주석 |

MSW만 따로 정리한 문서: [README-MSW.md](./README-MSW.md)  
RTL만 따로 정리한 문서: [README-RTL.md](./README-RTL.md)

---

## 기술 설명과 개념적인 코드

아래는 이 저장소에 쓰인 도구가 **무엇을 해결하는지**, 그리고 **코드로는 어떤 모양인지**를 요약한 것입니다. 실제 파일과 1:1로 같지 않아도 되는 **개념 스케치**입니다.

### Vitest

**역할:** Vite와 같은 설정·모듈 해석을 공유하는 테스트 러너입니다. Jest와 비슷한 API(`describe`, `it`, `expect`)를 쓰면서도 ESM·Vite 플러그인과 잘 맞습니다.

**개념 코드 — 최소 설정 뼈대:**

```ts
// vitest.config.ts (개념)
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, {
  test: {
    environment: 'jsdom',       // 브라우저 DOM API 흉내
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

```ts
// 어떤 모듈이든 테스트 파일에서
import { describe, it, expect } from 'vitest'

describe('예시', () => {
  it('1 + 1', () => {
    expect(1 + 1).toBe(2)
  })
})
```

### React Testing Library(RTL)

**역할:** “구현 디테일”이 아니라 **사용자가 보고 쓰는 화면** 기준으로 검증합니다. `data-testid`는 최후 수단이고, 가능하면 **접근 가능한 역할(role)**·**표시 이름(label)**으로 요소를 찾습니다.

**개념 코드 — 렌더와 질의:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

function Greeting({ name }: { name: string }) {
  return <p>안녕, {name}</p>
}

describe('Greeting', () => {
  it('이름을 보여준다', () => {
    render(<Greeting name="오리" />)
    // getBy: 즉시 없으면 실패 / findBy: 비동기 대기
    expect(screen.getByText(/안녕, 오리/)).toBeInTheDocument()
  })
})
```

**jest-dom:** `toBeInTheDocument()` 같은 DOM 단언을 쓰려면 `import '@testing-library/jest-dom/vitest'`를 setup 파일에 한 번 걸어 둡니다.

### 컴포넌트 테스트 vs 통합 테스트

| 구분 | 초점 | 네트워크 | 이 프로젝트 예 |
|------|------|----------|----------------|
| 컴포넌트(단위에 가깝게) | props → UI | 보통 없음 | `DuckCard`만 렌더 |
| 통합 | 여러 단위가 합쳐진 흐름 | MSW 등으로 대체 | `DuckList` + `fetch` + 자식 카드 |

**개념 코드 — 컴포넌트 테스트(얇게):**

```tsx
render(<DuckCard duck={{ id: '1', name: '청둥오리', species: 'Anas' }} />)
expect(screen.getByRole('heading', { name: '청둥오리' })).toBeInTheDocument()
```

**개념 코드 — 통합 테스트(두껍게):**

```tsx
render(<DuckList />) // 내부에서 fetch → MSW가 응답을 주입
expect(await screen.findByRole('list')).toBeInTheDocument()
```

### MSW(Mock Service Worker)

**역할:** `fetch` / `XMLHttpRequest`가 나가는 지점에서 **실제 네트워크 대신** 고정된 응답을 돌려줍니다. `jest.mock('./api')`처럼 모듈을 갈아끼우는 것과 달리, **앱 코드는 그대로** 두고 HTTP만 바꿉니다.

- **Node(테스트):** `msw/node`의 `setupServer` — Vitest가 돌아가는 프로세스 안에서 요청을 가로챕니다.
- **브라우저(개발):** `msw/browser`의 `setupWorker` — Service Worker가 요청을 가로챕니다.

**개념 코드 — 핸들러와 테스트 서버:**

```ts
// handlers (개념)
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('*/api/ducks', () =>
    HttpResponse.json([{ id: '1', name: '청둥오리', species: 'Anas platyrhynchos' }]),
  ),
]
```

```ts
// 테스트 진입 시 (개념)
import { setupServer } from 'msw/node'
import { beforeAll, afterEach, afterAll } from 'vitest'

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers()) // 테스트마다 기본 핸들러로 복구
afterAll(() => server.close())
```

```ts
// 특정 테스트만 다른 응답 (개념)
import { http, HttpResponse } from 'msw'

server.use(
  http.get('*/api/ducks', () => HttpResponse.json([], { status: 200 })),
)
```

### 테스트 커버리지

**역할:** 어떤 줄·분기·함수가 테스트에 의해 실행됐는지 비율로 보여 줍니다. **높은 커버리지 = 버그 없음**은 아니고, “안 돌아가 본 코드가 얼마나 남았는지”를 보는 지표에 가깝습니다.

**전략(개념):**

- **포함:** `src` 아래 실제 앱·도메인 코드.
- **제외:** `*.test.tsx`, `mocks/`, `main.tsx`처럼 “제품 품질”과 거리가 있거나 반복만 많은 파일 — 숫자는 내려가도 **의미 있는 범위**에 집중합니다.

```ts
// vitest coverage (개념)
coverage: {
  provider: 'v8',
  reporter: ['text', 'html', 'lcov'],
  include: ['src/**/*.{ts,tsx}'],
  exclude: ['**/*.test.*', 'src/mocks/**', 'src/main.tsx'],
},
```

---

## 사전 요구 사항

- Node.js (LTS 권장)
- npm

## 설치 및 실행

```bash
cd week08/duck
npm install
```

### 개발 서버

`npm run dev`로 띄우면, 개발 모드에서만 MSW 브라우저 워커가 `/api/ducks` 요청을 가로채 샘플 데이터를 돌려줍니다. 별도 백엔드 없이 목록 UI를 확인할 수 있습니다.

```bash
npm run dev
```

### 테스트

```bash
# watch 모드
npm test

# 한 번만 실행 (CI 등)
npm run test:run
```

### 커버리지

```bash
npm run test:coverage
```

리포트는 `coverage/`에 생성됩니다. 콘솔(text), 브라우저로 열어볼 HTML, CI용 lcov 등이 포함됩니다. 테스트 파일·`mocks`·`test` 유틸·`main.tsx` 등은 측정에서 제외해, 앱 로직 위주의 수치가 나오도록 맞춰 두었습니다.

## 폴더 구조 요약

```
src/
  api/ducks.ts          # fetch로 오리 목록 요청
  components/
    DuckCard.tsx        # 표시 전용 카드
    DuckList.tsx        # 로딩/에러/목록 + DuckCard 조합
    DuckCard.test.tsx   # 컴포넌트 테스트
    DuckList.integration.test.tsx  # 통합 테스트
  mocks/
    handlers.ts         # MSW 핸들러 정의
    server.ts           # Node(테스트)용 setupServer
    browser.ts          # 브라우저(개발)용 setupWorker
  test/setup.ts         # jest-dom, cleanup, MSW 서버 수명주기
public/
  mockServiceWorker.js  # MSW 워커 스크립트 (msw init 결과)
```

## 컴포넌트 테스트와 통합 테스트 구분

- **컴포넌트 테스트** (`DuckCard.test.tsx`): 한 컴포넌트에 props만 넣고 렌더 결과를 검증합니다. 네트워크나 부모 상태에 의존하지 않아 빠르고 원인 파악이 쉽습니다.
- **통합 테스트** (`DuckList.integration.test.tsx`): API 호출 → 로딩/성공/실패 상태 → 자식 카드까지 사용자 관점 흐름을 검증합니다. HTTP는 MSW로 고정해 실제 서버 없이 재현합니다.

## MSW 동작 방식

- **테스트**: `src/test/setup.ts`에서 `msw/node`의 `server`를 `listen`하고, 각 테스트 후 `resetHandlers()`로 핸들러를 기본값으로 되돌립니다.
- **로컬 개발**: `src/main.tsx`에서 개발 모드일 때만 `browser` 워커를 시작합니다. 처음 클론한 뒤 `public/mockServiceWorker.js`가 없다면 프로젝트 루트에서 `npx msw init public --save`를 다시 실행하면 됩니다.

## 빌드

```bash
npm run build
```

출력은 `dist/`입니다.
