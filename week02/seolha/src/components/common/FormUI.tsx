type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type FormErrors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

type Props = {
  values: FormValues
  errors: FormErrors
  isSubmitting: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  title: string
}

export default function FormUI({
  values,
  errors,
  isSubmitting,
  handleChange,
  handleSubmit,
  title
}: Props) {
  return (
    <div className="bg-white w-[380px] rounded-3xl p-8 shadow-lg flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="이름"
          className="border p-3 rounded-xl"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="이메일"
          className="border p-3 rounded-xl"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="border p-3 rounded-xl"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호 확인"
          className="border p-3 rounded-xl"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white rounded-xl h-12 mt-2"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}