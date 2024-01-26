import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppScreen from '../screens/App/AppScreen/AppScreen'
import { useTheme } from '../hooks'
import { getNavigationTheme } from '../utils'

const Stack = createNativeStackNavigator()

const AppNavigation: React.FC = () => {
    
    const{ theme } = useTheme()
    const myTheme = getNavigationTheme(theme)
    return (
        <NavigationContainer 
            theme={myTheme} 
        >
            <Stack.Navigator 
                initialRouteName="AppScreen"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen 
                    name='AppScreen'
                    component={AppScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
