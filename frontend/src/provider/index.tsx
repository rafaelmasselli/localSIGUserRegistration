import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { UserContextProvider } from "../context/user";

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <UserContextProvider>
      <CookiesProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </CookiesProvider>
    </UserContextProvider>
  );
}
