import { DefaultTheme } from "@react-navigation/native";
import { useTheme } from "../hooks";

export const getNavigationTheme = (theme) => {
    const{ darkMode } = useTheme()
    return{
        colors:{
            ...DefaultTheme.colors,
            "background": theme.Default.background,
            "card": theme.Default.background,
            "text": theme.Text.style.color,
        },
        "dark": darkMode 
    }
}
