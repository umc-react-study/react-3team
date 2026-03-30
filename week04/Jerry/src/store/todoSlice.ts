import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const SAMPLE: Todo[] = [
  { id: 1, text: '완료와 경우', priority: 'medium', done: true },
  { id: 2, text: '우선순위 낮음', priority: 'low', done: false },
  { id: 3, text: '우선순위 높음', priority: 'high', done: false },
  { id: 4, text: '우선순위 보통', priority: 'medium', done: false },
]

export type Priority = 'low' | 'medium' | 'high'

export interface Todo {
  id: number
  text: string
  priority: Priority
  done: boolean
}

interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'done'
}

const initialState: TodoState = { todos: SAMPLE, filter: 'all' }

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // PayloadAction: action의 typescript 타입 
    // payload(text: 할일, priority: 우선순위)
    // state: todos 배열 + filter 
    // action: dispatch할 때 넘긴 정보 (action.payload로 데이터 접근)
    addTodo: (state, action: PayloadAction<{ text: string; priority: Priority }>) => {
      state.todos.push({ id: Date.now(), text: action.payload.text, priority: action.payload.priority, done: false })
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload)
      if (todo) todo.done = !todo.done
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload)
    },
    clearDone: (state) => {
      state.todos = state.todos.filter((t) => !t.done)
    },
    resetSample: (state) => {
      state.todos = SAMPLE
    },
    setFilter: (state, action: PayloadAction<TodoState['filter']>) => {
      state.filter = action.payload
    },
  },
})

export const { addTodo, toggleTodo, deleteTodo, clearDone, resetSample, setFilter } = todoSlice.actions
export default todoSlice.reducer
