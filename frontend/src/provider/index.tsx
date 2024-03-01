import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <CookiesProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </CookiesProvider>
  );
}
