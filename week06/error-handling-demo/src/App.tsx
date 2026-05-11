import { NavLink, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { ApiErrorClassificationPage } from "./pages/ApiErrorClassificationPage"
import { DeclarativeErrorHandlingPage } from "./pages/DeclarativeErrorHandlingPage"
import { ErrorBoundaryPage } from "./pages/ErrorBoundaryPage"
import { FallbackUiPage } from "./pages/FallbackUiPage"
import { ImperativeTryCatchPage } from "./pages/ImperativeTryCatchPage"

const navItems = [
  { to: "/error-boundary", label: "Error Boundary" },
  { to: "/imperative-try-catch", label: "try/catch (명령적 처리)" },
  { to: "/declarative-error-handling", label: "선언적 에러 처리" },
  { to: "/api-error-classification", label: "API 에러 분류" },
  { to: "/fallback-ui", label: "Fallback UI" },
]

function App() {
  return (
    <main className="app-shell">
      <header className="app-header surface">
        <div>
          <p className="eyebrow">Operational Stability</p>
          <h1>에러 핸들링 & 안정성 데모 센터</h1>
          <p className="muted">실무에서 자주 쓰는 에러 처리 패턴을 페이지별로 체험합니다.</p>
        </div>
        <div className="header-badges">
          <span className="badge">React 19</span>
          <span className="badge">TypeScript</span>
          <span className="badge">Production UI</span>
        </div>
      </header>

      <nav className="tab-nav" aria-label="error-handling-pages">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "tab active" : "tab")}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <section className="page-wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/error-boundary" replace />} />
          <Route path="/error-boundary" element={<ErrorBoundaryPage />} />
          <Route path="/imperative-try-catch" element={<ImperativeTryCatchPage />} />
          <Route path="/declarative-error-handling" element={<DeclarativeErrorHandlingPage />} />
          <Route path="/api-error-classification" element={<ApiErrorClassificationPage />} />
          <Route path="/fallback-ui" element={<FallbackUiPage />} />
        </Routes>
      </section>
    </main>
  )
}

export default App
