import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

/**
 * 테스트 커버리지 전략 (요약)
 * - UI 단위: DuckCard처럼 props만 검증 → 빠르고 안정적
 * - 통합: DuckList처럼 fetch + 상태 + 자식 컴포넌트 → MSW로 API 고정
 * - 리포트: text(콘솔), html(로컬 리뷰), lcov(CI 연동)
 * - 제외: main 진입점, mocks, test 유틸은 커버리지에서 제외해 의미 있는 수치만 본다
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      globals: false,
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'json', 'lcov'],
        reportsDirectory: './coverage',
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.test.{ts,tsx}',
          'src/**/*.integration.test.{ts,tsx}',
          'src/mocks/**',
          'src/test/**',
          'src/main.tsx',
          'src/vite-env.d.ts',
        ],
      },
    },
  }),
)
