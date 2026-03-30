export function validate(values: any) {
  const errors: any = {}

  if (!values.name || values.name.length < 3) {
    errors.name = "이름은 3글자 이상이어야 합니다"
  }

  if (!values.email.includes("@")) {
    errors.email = "올바른 이메일 형식이 아닙니다"
  }

  if (values.password.length < 6) {
    errors.password = "비밀번호는 6자 이상이어야 합니다"
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다"
  }

  return errors
}