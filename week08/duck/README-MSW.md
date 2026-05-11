# MSW(Mock Service Worker) — 이 프로젝트 기준 설명

이 문서는 `duck` 예제에서 **MSW를 왜 쓰는지**, **브라우저와 테스트(Node)에서 어떻게 다른지**, **이 저장소의 파일이 각각 무엇인지**를 정리합니다. 공식 문서는 [MSW — Getting started](https://mswjs.io/docs/quick-start)를 참고하면 됩니다.

## MSW가 하는 일

앱이 `fetch`나 `XHR`로 **밖으로 나가는 HTTP 요청**을 가로채서, 개발자가 정의한 **가짜 응답**으로 바꿔 줍니다.

- **`jest.mock('../api')`**처럼 모듈을 통째로 바꾸지 않아도 됩니다. **실제 호출 경로**(예: `fetch('/api/ducks')`)를 그대로 두고, 네트워크 레이어만 조작합니다.
- 같은 **핸들러 정의**를 테스트(Node)와 로컬 개발(브라우저)에서 재사용하기 좋습니다.

## 두 가지 실행 환경

| 환경 | MSW API | 용도 | 이 프로젝트 파일 |
|------|---------|------|------------------|
| **Node** (Vitest 등) | `msw/node` → `setupServer` | 테스트 러너 프로세스 안에서 요청 가로채기 | `src/mocks/server.ts` |
| **브라우저** | `msw/browser` → `setupWorker` | Service Worker가 실제 탭의 네트워크 가로채기 | `src/mocks/browser.ts`, `public/mockServiceWorker.js` |

- **테스트**에서는 `setupServer`만 있으면 되고, `mockServiceWorker.js`는 필요 없습니다.
- **`npm run dev`**처럼 브라우저에서 돌릴 때는 Worker 스크립트가 `public/`에 있어야 하며, 보통 한 번 `npx msw init public --save`로 복사합니다.

## 핸들러(Handler)

“어떤 URL·메서드에 어떤 응답을 줄지”를 함수로 적습니다. MSW 2.x에서는 `http`, `HttpResponse`를 씁니다.

```ts
import { http, HttpResponse } from 'msw'

// 경로는 와일드카드로 호스트에 덜 의존하게 쓰는 경우가 많음
http.get('*/api/ducks', () =>
  HttpResponse.json([{ id: '1', name: '청둥오리', species: 'Anas platyrhynchos' }]),
)
```

이 프로젝트의 실제 정의는 `src/mocks/handlers.ts`에 있으며, 기본 목록·빈 배열·500 응답 등 시나리오용 핸들러를 묶어 두었습니다.

## 테스트에서의 수명 주기

Node 서버는 **한 번 띄우고**, 테스트마다 **핸들러만 초기화**하는 패턴이 흔합니다.

1. **`beforeAll`**: `server.listen()` — 이후 나가는 요청이 MSW로 간다.
2. **`afterEach`**: `server.resetHandlers()` — 앞 테스트에서 `server.use(...)`로 바꾼 핸들러를 **기본 핸들러**로 되돌린다.
3. **`afterAll`**: `server.close()` — 서버를 내린다.

이 흐름은 `src/test/setup.ts`에 모아 두었습니다.

## 특정 테스트만 응답 바꾸기

`server.use(추가_핸들러)`를 호출하면, **그 테스트(또는 그 이후 until reset)**에만 다른 응답을 줄 수 있습니다. 예: 빈 목록, 500 에러.

```ts
import { server } from '../mocks/server'
import { emptyDucksHandler } from '../mocks/handlers'

server.use(emptyDucksHandler)
// 이제 render(...) 후 기대하는 UI만 검증
```

통합 테스트 예시는 `src/components/DuckList.integration.test.tsx`를 보면 됩니다.

## 개발 서버에서 쓸 때 주의할 점

- `src/main.tsx`에서 **개발 모드일 때만** `worker.start()`를 호출해, 프로덕션 빌드에는 MSW가 끼어들지 않게 합니다.
- 처음 저장소를 받았는데 목록이 안 뜨면 `public/mockServiceWorker.js`가 있는지 확인하고, 없으면 프로젝트 루트(`week08/duck`)에서 다음을 실행합니다.

```bash
npx msw init public --save
```

## 정리

| 질문 | 답 |
|------|-----|
| API 코드를 바꿔야 하나? | 아니요. `fetch` URL만 핸들러와 맞으면 됩니다. |
| 테스트와 dev 둘 다 쓰려면? | 핸들러는 공유하고, **서버(Node)** + **워커(브라우저)** 둘 다 연결합니다. |
| 핸들러를 깜빡 잡으면? | `onUnhandledRequest: 'error'`로 두면 디버깅하기 쉽습니다. (이 프로젝트 `setup.ts` 참고) |

더 깊은 내용은 [MSW — Documentation](https://mswjs.io/docs)에서 Request handler, Life-cycle events, Debugging 등을 이어서 읽으면 됩니다.
