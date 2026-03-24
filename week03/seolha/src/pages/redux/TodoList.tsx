import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/redux/store";
import {
    TOGGLE_TODO,
    DELETE_TODO,
    CLEAR_COMPLETED,
    RESET_SAMPLE,
} from "../../store/redux/todoSlice";

export default function TodoList() {
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.todo.todos);

    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const getButtonStyle = (type: string) =>
        `border p-2 px-4 rounded-xl font-bold ${
            filter === type
                ? "border-pink-500 text-pink-500"
                : "border-[#4a4a4a] text-white hover:bg-[#4a4a4a]"
        }`;

    return (
        <div className="text-white bg-[#2d2d2d] border border-[#4a4a4a] p-4 rounded-2xl">
            
            <div className="flex flex-row gap-4 mt-4 items-center justify-between">
                <h1 className="text-xl font-bold">할 일 목록</h1>

                <div className="flex flex-row items-center gap-4">
                    <button onClick={() => setFilter("all")} className={getButtonStyle("all")}>전체</button>
                    <button onClick={() => setFilter("active")} className={getButtonStyle("active")}>진행중</button>
                    <button onClick={() => setFilter("completed")} className={getButtonStyle("completed")}>완료</button>
                </div>
            </div>

            <div className="flex flex-row items-center gap-4 mt-4">
                <button
                    onClick={() => dispatch(CLEAR_COMPLETED())}
                    className="border border-[#4a4a4a] hover:bg-[#4a4a4a] text-white font-bold py-2 px-4 rounded-xl"
                >
                    완료 항목 삭제
                </button>

                <button
                    onClick={() => dispatch(RESET_SAMPLE())}
                    className="border border-[#4a4a4a] hover:bg-[#4a4a4a] text-white font-bold py-2 px-4 rounded-xl"
                >
                    샘플로 초기화
                </button>
            </div>

            <div className="mt-4">
                {filteredTodos.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex flex-row items-center justify-between gap-4 mt-2 p-4 bg-[#383838] border border-[#4a4a4a] rounded-xl"
                    >
                        <div className="flex flex-row items-center gap-4">
                            
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() =>
                                    dispatch(TOGGLE_TODO({ id: todo.id }))
                                }
                                className="w-5 h-5"
                            />

                            <span
                                className={
                                    todo.completed
                                        ? "line-through text-gray-500"
                                        : ""
                                }
                            >
                                {todo.text}
                            </span>

                            <span
                                className={`ml-auto px-2 py-1 text-sm rounded ${
                                    todo.priority === "high"
                                        ? "bg-red-500/20 text-red-500"
                                        : todo.priority === "mid"
                                        ? "bg-yellow-500/20 text-yellow-500"
                                        : "bg-green-500/20 text-green-500"
                                }`}
                            >
                                {todo.priority === "high"
                                    ? "높음"
                                    : todo.priority === "mid"
                                    ? "보통"
                                    : "낮음"}
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                dispatch(DELETE_TODO({ id: todo.id }))
                            }
                            className="border border-red-500 hover:bg-red-500 text-red-500 hover:text-white py-1 px-2 rounded-lg"
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}