import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TODO } from "../../store/redux/todoSlice";
import type { AppDispatch } from "../../store/redux/store";
import type { Priority } from "../../types/redux/Todo";

export default function AddTodo() {
    const dispatch = useDispatch<AppDispatch>();

    const [text, setText] = useState("");
    const [priority, setPriority] = useState<Priority>("low");

    const handleAdd = () => {
        if (!text.trim()) return;

        dispatch(
            ADD_TODO({
                text,
                priority,
            })
        );

        setText("");
        setPriority("low");
    };

    return (
        <div className="text-white bg-[#2d2d2d] border border-[#4a4a4a] p-4 rounded-2xl">
            <h1 className="text-xl font-bold">할 일 추가</h1>

            <div className="flex flex-row items-center gap-4">
                
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="할 일을 입력하세요"
                    className="w-full mt-4 p-2 rounded-xl bg-[#1a1a1a] border border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)} // ✅ 여기 수정
                    className="w-[50%] mt-4 p-2 rounded-xl bg-[#1a1a1a] border border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="low">우선순위 낮음</option>
                    <option value="mid">우선순위 보통</option>
                    <option value="high">우선순위 높음</option>
                </select>

                <button
                    onClick={handleAdd}
                    className="mt-4 w-[50%] bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl"
                >
                    추가
                </button>
            </div>
        </div>
    );
}