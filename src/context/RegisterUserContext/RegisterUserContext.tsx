import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChildrenProps, RegisterContextType, UserRegister } from '../../interfaces/interfaces';


export const RegisterUserContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterUserProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [user, setUser] = useState<UserRegister>({
    date: null,
    email: null,
    password: null,
    username: null,
  });

  return (
    <RegisterUserContext.Provider value={{ user, setUser }}>
      {children}
    </RegisterUserContext.Provider>
  );
};


