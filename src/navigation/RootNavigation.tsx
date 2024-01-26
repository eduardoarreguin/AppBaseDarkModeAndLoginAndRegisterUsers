import {  Platform, StatusBar } from 'react-native';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import { useTheme } from '../hooks';
import { useAuth } from '../hooks';

export const RootNavigation:React.FC = () => {
    const {auth} = useAuth();  console.log(Platform.OS, auth)
    
    const{ darkMode, theme } = useTheme()

    return ( 
        <>
            <StatusBar 
                animated 
                barStyle={darkMode? 'light-content': 'dark-content'} 
                backgroundColor={ theme.Default.background }
            />
            
            {auth? 
                <AppNavigation/> 
                    : 
                <AuthNavigation/> 
            }

        </>
    );
}




