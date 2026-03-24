import { useState } from "react";
import TodoSummary from "../components/todo/TodoSummary";
import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";
import type { Priority } from "../types/todo";
import { useAppDispatch, useAppSelector } from "../stores/redux/hooks";
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  resetSample,
  selectActiveCount,
  selectCompletedCount,
  selectFilter,
  selectFilteredTodos,
  selectTotalCount,
  setFilter,
  toggleTodo,
} from "../stores/redux/todoSlice";

export default function ReduxTodoPage() {
  const dispatch = useAppDispatch();

  // Redux store에서 필요한 값 읽기
  const totalCount = useAppSelector(selectTotalCount);
  const activeCount = useAppSelector(selectActiveCount);
  const completedCount = useAppSelector(selectCompletedCount);
  const filteredTodos = useAppSelector(selectFilteredTodos);
  const currentFilter = useAppSelector(selectFilter);

  // 입력 중인 값은 굳이 Redux까지 안 보내고 local state로 관리
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleAddTodo = () => {
    const trimmedText = text.trim();

    // 빈 문자열이면 추가하지 않음
    if (!trimmedText) return;

    // Redux action dispatch
    dispatch(addTodo({ text: trimmedText, priority }));

    // 입력창 초기화
    setText("");
    setPriority("medium");
  };

  return (
    <div className="space-y-6">
      {/* 상단 요약 카드 */}
      <TodoSummary totalCount={totalCount} activeCount={activeCount} completedCount={completedCount} />

      {/* 할 일 추가 폼 */}
      <TodoForm
        text={text}
        priority={priority}
        onTextChange={setText}
        onPriorityChange={setPriority}
        onSubmit={handleAddTodo}
      />

      {/* 아래 목록 영역 */}
      <TodoList
        todos={filteredTodos}
        currentFilter={currentFilter}
        onFilterChange={(filter) => dispatch(setFilter(filter))}
        onToggleTodo={(id) => dispatch(toggleTodo(id))}
        onDeleteTodo={(id) => dispatch(deleteTodo(id))}
        onClearCompleted={() => dispatch(clearCompleted())}
        onResetSample={() => dispatch(resetSample())}
      />
    </div>
  );
}
