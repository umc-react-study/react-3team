import { useEffect, useState, type FormEvent } from "react";

function useForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleChangeName = (e: any) => {
        setName(e.target.value);
    };

    const handleChangeEmail = (e: any) => {
        setEmail(e.target.value);
    };
    const handleSubmit = (e: FormEvent) => {
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

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function useCheckNickname(name: string) {
    const [isValid, setIsValid] = useState(false);
    const debouncedName = useDebounce(name, 500);
    useEffect(() => {
        if (debouncedName) {
            setIsValid(debouncedName.length >= 3);
        } else {
            setIsValid(false);
        }
    }, [debouncedName]);

    return isValid;
}

export default function useFormWithValidate() {
    const { name, email, handleChangeName, handleChangeEmail, handleSubmit } = useForm();
    const isNicknameValid = useCheckNickname(name);

    return {
        name,
        email,
        handleChangeName,
        handleChangeEmail,
        handleSubmit,
        isNicknameValid
    };
}