import useForm from "../hooks/useForm";

export default function HookForm() {
  const {
    name,
    email,
    handleSubmit,
    handleChangeName,
    handleChangeEmail
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-6 w-100 max-w-xl p-6 border rounded-4xl bg-white shadow-md"
    >
      <h1 className="text-2xl font-bold text-gray-800">
        Hook Form Example
      </h1>

      <input
        type="text"
        placeholder="이름을 입력하세요."
        value={name}
        onChange={handleChangeName}
        className="border p-2 rounded-3xl w-full h-14"
      />

      <input
        type="email"
        placeholder="이메일을 입력하세요."
        value={email}
        onChange={handleChangeEmail}
        className="border p-2 rounded-3xl w-full h-14"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-3xl h-14 w-full"
      >
        Submit
      </button>
    </form>
  );
}