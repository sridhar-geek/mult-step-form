"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

type StepContextType = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isComplete: Record<number, boolean>;
  setIsComplete: Dispatch<SetStateAction<Record<number, boolean>>>;
};

// Creating Context;
export const stepContext = createContext<StepContextType>({
  step: 1,
  setStep: () => {},
  isComplete: { 0: true, 1: false, 2: false, 3: false, 4: false },
  setIsComplete: () => {},
});

const StepContextProvider = ({ children }: { children: React.ReactNode }) => {
  // State to identify the current Step or current stage of form
  const [step, setStep] = useState<number>(1);
  // State to identify which stage is completed
  const [isComplete, setIsComplete] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  return (
    <stepContext.Provider value={{ step, setStep, isComplete, setIsComplete }}>
      {children}
    </stepContext.Provider>
  );
};

export default StepContextProvider;
