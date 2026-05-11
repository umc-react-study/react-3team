import { DuckList } from './components/DuckList'
import './App.css'

export default function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>오리 목록 데모</h1>
        <p>Vitest · React Testing Library · MSW · 커버리지 설정 포함</p>
      </header>
      <DuckList />
    </main>
  )
}
