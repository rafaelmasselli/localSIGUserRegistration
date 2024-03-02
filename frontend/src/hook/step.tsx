import { useContext } from "react";
import { StepContext, StepContextType } from "../context/step";

export const useStepContext = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
