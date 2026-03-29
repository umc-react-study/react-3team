import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Zustand from './pages/Zustand'
import Redux from './pages/Redux'
import ContextApi from './pages/ContextApi'
import TanstackQuery from './pages/TanstackQuery'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/zustand" element={<Zustand />} />
        <Route path="/redux" element={<Redux />} />
        <Route path="/context-api" element={<ContextApi />} />
        <Route path='/tanstack-query' element={<TanstackQuery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
