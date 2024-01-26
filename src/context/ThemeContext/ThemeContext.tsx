import React, { useState, useEffect, createContext } from 'react';
import { ThemeProvider as Theme } from '@rneui/themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme } from './LightTheme';
import { darkTheme } from './DarkTheme';
import { ThemeContextProps, ChildrenProps } from '../../interfaces/interfaces';

export const ThemeContext = createContext<ThemeContextProps>({
    darkMode: true,
    toggleTheme: () => null,
    theme: {}
}) 

export const ThemeProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false)

    useEffect(()=>{
        ( async() => {
            try {
                const response = await AsyncStorage.getItem("theme")
                if(response) setDarkMode(JSON.parse(response));
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const toggleTheme = async() => {
        setDarkMode(!darkMode);
        await AsyncStorage.setItem("theme", JSON.stringify(!darkMode))
    }

    const themeContextValue = {
        darkMode,
        toggleTheme,
        theme: darkMode? darkTheme : lightTheme
    }

    return(
        <ThemeContext.Provider value={themeContextValue} >
            <Theme 
                theme={themeContextValue.theme}                             
            >
                {children}
            </Theme>
        </ThemeContext.Provider>
    );
}



