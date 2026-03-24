import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/redux/store";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import TodoStates from "./TodoStates";

export default function ReducerPage() {
    const todos = useSelector((state: RootState) => state.todo.todos);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="bg-[#242424] min-h-screen p-4 gap-4 flex flex-col">
            <TodoStates />
            <AddTodo />
            <TodoList />
        </div>
    );
}