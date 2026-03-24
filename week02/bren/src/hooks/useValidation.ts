// export function useValidation() {
//   const validateStep = (step: number, data: { name: string; email: string }) => {
//     if (step === 1 && data.name.length < 2) return "이름을 더 입력하세요.";
//     if (step === 2 && !data.email.includes("@")) return "이메일 형식이 아닙니다.";
//     return "";
//   };
//   return { validateStep };
// }

// 리팩토링 : 순수함수로 변경
export function validateStep(step: number, data: { name: string; email: string }) {
  if (step === 1 && data.name.length < 2) return "이름을 더 입력하세요.";
  if (step === 2 && !data.email.includes("@")) return "이메일 형식이 아닙니다.";
  return "";
}
