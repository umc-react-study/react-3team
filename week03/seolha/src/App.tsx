import { useState } from 'react'
import './App.css'
import ContextPage from './pages/context/ContextPage'
import { SettingsProvider } from './store/context/SettingsContext'
import ReducerPage from './pages/redux/ReduxPage'
import ZustandPage from './pages/zustand/ZustandPage'
import { Provider } from 'react-redux'
import { store } from './store/redux/store'

function App() {

  return (
    /* ContextAPI를 활용한 전역 상태 관리 예시 
    <SettingsProvider>
      <ContextPage />
    </SettingsProvider>
    */
    /* useReducer를 활용한 전역 상태 관리 예시 
    <Provider store={store}> 
      <ReducerPage />
    </Provider>
    */
    /* Zustand를 활용한 전역 상태 관리 예시 */
    <ZustandPage />
    
  )
}

export default App
