import { memo, useCallback, useMemo, useState } from "react";

type StudentProps = {
  /** useMemo로 만든 객체 — studentAge가 안 바뀌면 참조가 같아 memo가 스킵 가능 */
  student: { name: string; age: number };
};

/** React.memo: props가 같으면 리렌더 생략 */
const Student = memo(function Student({ student }: StudentProps) {
  console.log("👶 자녀(학생)도 렌더링이 되었네요");

  return (
    <div className="mt-4 rounded-lg border-2 border-sky-300 dark:border-sky-600 bg-sky-50/50 dark:bg-sky-950/30 p-4">
      <h2 className="text-lg font-semibold m-0 mb-2">👶 학생</h2>
      <p className="m-0 text-sm">
        name: <strong>{student.name}</strong>
      </p>
      <p className="m-0 text-sm mt-1">
        age: <strong className="tabular-nums">{student.age}</strong>
      </p>
    </div>
  );
});

export function Week06() {
  const [schoolAge, setSchoolAge] = useState(0);
  const [studentAge, setStudentAge] = useState(0);

  console.log("🏫 학교(부모) 컴포넌트가 렌더링이 되었어요");

  /** useMemo: studentAge가 바뀔 때만 새 객체 — 학교만 바꿀 때는 참조 유지 → Student 스킵 */
  const studentForChild = useMemo(
    () => ({ name: "홍길동", age: studentAge }),
    [studentAge],
  );

  /** useCallback: 핸들러 참조 고정 (자식에게 넘길 때 특히 유용) */
  const incrementSchool = useCallback(() => {
    setSchoolAge((n) => n + 1);
  }, []);

  const incrementStudent = useCallback(() => {
    setStudentAge((n) => n + 1);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 min-h-screen">
      <h1 className="text-xl font-bold m-0 mb-4">Week06 — 학교 / 학생</h1>

      <div className="rounded-lg border-2 border-indigo-800 dark:border-indigo-400 p-4 bg-white dark:bg-slate-900/50">
        <h2 className="text-lg font-semibold m-0 mb-2">🏫 학교 (부모)</h2>
        <p className="m-0 text-sm mb-3">
          age: <strong className="tabular-nums">{schoolAge}</strong>
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md bg-indigo-700 hover:bg-indigo-800 text-white text-sm px-3 py-1.5"
            onClick={incrementSchool}
          >
            학교 나이 증가
          </button>
          <button
            type="button"
            className="rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm px-3 py-1.5"
            onClick={incrementStudent}
          >
            학생 나이 증가
          </button>
        </div>

        <Student student={studentForChild} />
      </div>

      <p className="text-xs text-slate-500 mt-4 m-0 leading-relaxed">
        콘솔을 열고{" "}
        <strong className="text-slate-600 dark:text-slate-400">
          학교 나이만
        </strong>{" "}
        올려 보세요.{" "}
        <code className="text-[0.7rem] bg-slate-200 dark:bg-white/10 px-1 rounded">
          useMemo
        </code>
        로 만든 <code className="text-[0.7rem]">student</code> 참조가 그대로라{" "}
        <code className="text-[0.7rem]">React.memo</code>인 학생은 리렌더되지
        않습니다. 학생 나이를 올리면 그때만 학생 로그가 다시 찍힙니다.
      </p>
    </div>
  );
}
