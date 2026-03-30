import { useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../store/store'
import type { RootState, AppDispatch } from '../store/store'
import { addTodo, toggleTodo, deleteTodo, clearDone, resetSample, setFilter } from '../store/todoSlice'
import type { Priority } from '../store/todoSlice'

const priorityStyle: Record<Priority, string> = {
  low: 'bg-green-800 text-green-200',
  medium: 'bg-yellow-800 text-yellow-200',
  high: 'bg-pink-800 text-pink-200',
}

const priorityLabel: Record<Priority, string> = { low: 'low', medium: 'medium', high: 'high' }

function TodoApp() {
  const dispatch = useDispatch<AppDispatch>()
  const { todos, filter } = useSelector((state: RootState) => state.todo)
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const filtered = todos.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  )

  const handleAdd = () => {
    if (!text.trim()) return
    dispatch(addTodo({ text, priority }))
    setText('')
  }

  const filterBtns: { label: string; value: typeof filter }[] = [
    { label: '전체', value: 'all' },
    { label: '진행중', value: 'active' },
    { label: '완료', value: 'done' },
  ]

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-gray-200 p-6 font-sans">
      {/* 통계 배지 */}
      <div className="flex gap-3 mb-5">
        {[
          { label: '전체', count: todos.length, bg: 'bg-[#3b2a1a]' },
          { label: '진행중', count: todos.filter((t) => !t.done).length, bg: 'bg-[#1a3b2a]' },
          { label: '완료', count: todos.filter((t) => t.done).length, bg: 'bg-[#1a1a3b]' },
        ].map(({ label, count, bg }) => (
          <div key={label} className={`${bg} rounded-lg px-5 py-4 flex-1`}>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-3xl font-bold mt-1">{count}</p>
          </div>
        ))}
      </div>

      {/* 할 일 추가 */}
      <div className="bg-[#2a2a3e] rounded-lg p-5 mb-5">
        <p className="font-bold mb-3">할 일 추가</p>
        <div className="flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="새 할 일을 입력하세요"
            className="bg-[#1a1a2e] border border-gray-600 text-gray-200 p-2 rounded flex-1 text-sm outline-none"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="bg-[#1a1a2e] border border-gray-600 text-gray-200 p-2 rounded text-sm outline-none cursor-pointer"
          >
            <option value="medium">우선순위 보통</option>
            <option value="low">우선순위 낮음</option>
            <option value="high">우선순위 높음</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-1 rounded font-bold cursor-pointer"
          >
            추가
          </button>
        </div>
      </div>

      {/* 할 일 목록 */}
      <div className="bg-[#2a2a3e] rounded-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold">할 일 목록</p>
          <div className="flex gap-1">
            {filterBtns.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => dispatch(setFilter(value))}
                className={`px-3 py-0.5 rounded text-sm cursor-pointer ${filter === value ? 'bg-pink-500 text-white' : 'bg-[#1a1a2e] text-gray-400 hover:bg-gray-700'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => dispatch(clearDone())} className="text-sm border border-gray-600 px-3 py-1 rounded hover:bg-gray-700 cursor-pointer">
            완료 항목 삭제
          </button>
          <button onClick={() => dispatch(resetSample())} className="text-sm border border-gray-600 px-3 py-1 rounded hover:bg-gray-700 cursor-pointer">
            샘플로 초기화
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {filtered.map((todo) => (
            <div key={todo.id} className="bg-[#1a1a2e] rounded p-3 flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="cursor-pointer w-4 h-4"
              />
              <span className={`text-sm ${todo.done ? 'line-through text-gray-500' : ''}`}>{todo.text}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${priorityStyle[todo.priority]}`}>{priorityLabel[todo.priority]}</span>
              <span className="flex-1" />
              <button onClick={() => dispatch(deleteTodo(todo.id))} className="text-xs border border-gray-600 px-2 py-0.5 rounded hover:bg-gray-700 cursor-pointer">
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Redux() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  )
}

export default Redux
