/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface UserType {
  fullName: string;
  zipCode: string;
  maritalStatus: string;
  birthDate: string;
  age: number;
}

type UserContextType = {
  user: UserType;
  updateUser: (newUser: UserType) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>({
    fullName: "",
    zipCode: "",
    maritalStatus: "",
    birthDate: "",
    age: 0,
  });
  const updateUser = (newUser: UserType) => {
    setUser({ ...newUser });
  };
  useEffect(() => {}, [user]);
  const contextValue: UserContextType = {
    user,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
export type { UserContextType };
