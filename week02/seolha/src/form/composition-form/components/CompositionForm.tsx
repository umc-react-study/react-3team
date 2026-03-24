import useFormWithValidate from "../hooks/useFormWithValidate";

export default function CompositionForm() {
    const { name, email, handleChangeName, handleChangeEmail, isNicknameValid, handleSubmit } = useFormWithValidate();

    return (
        <div className="bg-[#0f0f0f] h-80 flex flex-col rounded-3xl bg-white items-center justify-center">
            <h1 className="text-black text-2xl">Composition Form</h1>
            <form 
                className="p-6 flex flex-col items-center gap-4"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="이름을 입력하세요."
                    className="border p-2 rounded-3xl w-64 h-12"
                    value={name}
                    onChange={handleChangeName}
                />
                { name && (
                    <p className={isNicknameValid ? "text-green-500" : "text-red-500"}>
                        {isNicknameValid ? "사용 가능한 닉네임" : "닉네임은 3글자 이상"}
                    </p>
                )}
                <input
                    type="email"
                    placeholder="이메일을 입력하세요."
                    className="border p-2 rounded-3xl w-64 h-12"
                    value={email}
                    onChange={handleChangeEmail}
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