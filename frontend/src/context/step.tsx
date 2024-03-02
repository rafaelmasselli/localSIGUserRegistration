import React, { createContext, useState, useEffect, ReactNode } from "react";

type StepContextType = {
  step: number;
  updateStep: (newStep: number) => void;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

const StepContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(() => {
    const localData = localStorage.getItem("step");
    return localData ? Number(localData) : 1;
  });

  const updateStep = (newStep: number) => {
    setStep(newStep);
  };

  useEffect(() => {
    localStorage.setItem("step", step.toString());
  }, [step]);

  const contextValue: StepContextType = {
    step,
    updateStep,
  };

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  );
};

export { StepContextProvider, StepContext };
export type { StepContextType };
