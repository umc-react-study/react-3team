import { useFormContext } from "../context/FormContext";

export default function ReducerForm() {
  const { state, dispatch } = useFormContext();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_NAME", payload: e.target.value });
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_EMAIL", payload: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.name || !state.email) {
      alert("모든 값을 입력해주세요.");
      return;
    }

    alert(`Name: ${state.name}, Email: ${state.email}`);
  };

  return (
    <div className="bg-white h-80 w-100 rounded-3xl flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-black">
        Reducer Form Example
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full px-6"
      >
        <input
          type="text"
          value={state.name}
          onChange={handleChangeName}
          placeholder="이름을 입력하세요."
          className="border p-2 rounded-3xl w-64 h-12"
        />

        <input
          type="email"
          value={state.email}
          onChange={handleChangeEmail}
          placeholder="이메일을 입력하세요."
          className="border p-2 rounded-3xl w-64 h-12"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-3xl w-64 h-12"
        >
          Submit
        </button>
      </form>
    </div>
  );
}