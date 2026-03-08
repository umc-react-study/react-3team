import { useState } from "react";
import "./index.css";

import { Step1_Monolithic } from "./todo/Step1_Monolithic";
import { Step2_PresentationalContainer } from "./todo/Step2_PresentationalContainer";
import { Step3_CustomHook } from "./todo/Step3_CustomHook";
import { Step4_CompoundComponent } from "./todo/Step4_CompoundComponent";
import { MyPractice } from "./practice/MyPractice";

const STEPS = [
  {
    id: 1,
    label: "Step 1",
    title: "Monolithic",
    desc: "UI + 상태 + 로직이 한 컴포넌트에",
    component: Step1_Monolithic,
    color: "yellow",
  },
  {
    id: 2,
    label: "Step 2",
    title: "Presentational / Container",
    desc: "UI 컴포넌트와 데이터 컨테이너 분리",
    component: Step2_PresentationalContainer,
    color: "blue",
  },
  {
    id: 3,
    label: "Step 3",
    title: "Custom Hook",
    desc: "Container를 Hook으로 대체",
    component: Step3_CustomHook,
    color: "green",
  },
  {
    id: 4,
    label: "Step 4",
    title: "Compound Component",
    desc: "Context + 서브컴포넌트로 구조 제어",
    component: Step4_CompoundComponent,
    color: "purple",
  },
  {
    id: 5,
    label: "실습",
    title: "내 실습",
    desc: "src/practice/MyPractice.tsx 에서 직접 작성",
    component: MyPractice,
    color: "orange",
  },
] as const;

type StepColor = (typeof STEPS)[number]["color"];

const COLOR_MAP: Record<StepColor, { tab: string; active: string; dot: string }> = {
  yellow: {
    tab: "hover:border-yellow-500/50 hover:text-yellow-300",
    active: "border-yellow-500 text-yellow-300 bg-yellow-500/10",
    dot: "bg-yellow-400",
  },
  blue: {
    tab: "hover:border-blue-500/50 hover:text-blue-300",
    active: "border-blue-500 text-blue-300 bg-blue-500/10",
    dot: "bg-blue-400",
  },
  green: {
    tab: "hover:border-green-500/50 hover:text-green-300",
    active: "border-green-500 text-green-300 bg-green-500/10",
    dot: "bg-green-400",
  },
  purple: {
    tab: "hover:border-purple-500/50 hover:text-purple-300",
    active: "border-purple-500 text-purple-300 bg-purple-500/10",
    dot: "bg-purple-400",
  },
  orange: {
    tab: "hover:border-orange-500/50 hover:text-orange-300",
    active: "border-orange-500 text-orange-300 bg-orange-500/10",
    dot: "bg-orange-400",
  },
};

export function App() {
  const [activeStep, setActiveStep] = useState(1);

  const current = STEPS.find((s) => s.id === activeStep)!;
  const ActiveComponent = current.component;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-1">Compound Component 실습</h1>
        <p className="text-white/40 text-sm">
          SRP → Presentational/Container → Custom Hook → Compound Component
        </p>
      </div>

      {/* Step Tabs */}
      <div className="grid grid-cols-5 gap-2 mb-8">
        {STEPS.map((step) => {
          const colors = COLOR_MAP[step.color];
          const isActive = step.id === activeStep;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`
                flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all
                ${isActive ? colors.active : "border-white/10 text-white/50 " + colors.tab}
              `}
            >
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${isActive ? "opacity-100" : "opacity-40"}`} />
                <span className="text-xs font-medium">{step.label}</span>
              </div>
              <span className="text-xs font-semibold leading-tight">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Step Description */}
      <div className="mb-6 px-1">
        <p className="text-white/40 text-xs">{current.desc}</p>
      </div>

      {/* Content */}
      <ActiveComponent />
    </div>
  );
}

export default App;
