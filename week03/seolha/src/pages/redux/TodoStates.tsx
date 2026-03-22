import { useSelector } from "react-redux";
import type { RootState } from "../../store/redux/store";

export default function TodoStates() {
    const todos = useSelector((state: RootState) => state.todo.todos);

    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const ongoing = total - completed;

    return (
        <div className="flex flex-row gap-4">
            
            <div className="text-white w-full bg-orange-500/10 border border-[#4a4a4a] p-4 rounded-2xl">
                <p className="text-gray-400">전체</p>
                <h1 className="text-xl font-bold">{total}</h1>
            </div>

            <div className="text-white w-full bg-green-500/10 border border-[#4a4a4a] p-4 rounded-2xl">
                <p className="text-gray-400">진행중</p>
                <h1 className="text-xl font-bold">{ongoing}</h1>
            </div>

            <div className="text-white w-full bg-blue-500/10 border border-[#4a4a4a] p-4 rounded-2xl">
                <p className="text-gray-400">완료</p>
                <h1 className="text-xl font-bold">{completed}</h1>
            </div>

        </div>
    );
}