import { CreateThemeOptions } from "@rneui/themed";
import { ReactNode } from "react";

export interface ThemeContextProps {
    darkMode: boolean;
    toggleTheme: () => void;
    theme: any;
        //theme: CreateThemeOptions;
}
export interface ChildrenProps {
    children: React.ReactNode;
}

export interface UserRegister {
    date: Date | null;
    email: string | null;
    password: string | null;
    username: string | null;
}

export interface RegisterContextType {
    user: UserRegister;
    setUser: React.Dispatch<React.SetStateAction<UserRegister>>;
  }

export interface Tokens { 
    access: string| null;
    refresh: string| null; 
}

export interface AuthContextType {
    auth: undefined| {};
    accessToken: string | null;
    refreshToken : string | null;
    login: (tokens: Tokens) => void;
    logout: () => void;
}



export interface UserLogin {
    email: string;
    password: string;
}