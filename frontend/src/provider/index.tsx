import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { UserContextProvider, StepContextProvider } from "../context";

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <StepContextProvider>
      <UserContextProvider>
        <CookiesProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </CookiesProvider>
      </UserContextProvider>
    </StepContextProvider>
  );
}
