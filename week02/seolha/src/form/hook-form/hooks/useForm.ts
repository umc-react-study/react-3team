import { useState } from "react";

export default function useForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      alert("모든 값을 입력해주세요.");
      return;
    }

    alert(`Name: ${name}, Email: ${email}`);
  };

  return {
    name,
    email,
    handleChangeName,
    handleChangeEmail,
    handleSubmit
  };
}