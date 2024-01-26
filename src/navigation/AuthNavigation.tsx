import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from '../hooks'
import { getNavigationTheme } from '../utils'
import {AuthScreen, LoginEmailScreen, RegisterBirthdayScreen, RegisterEmailScreen, RegisterPasswordScreen, RegisterUserNameScreen} from '../screens/Auth/';
import { Button } from '@rneui/themed'
import { RegisterUserProvider } from '../context'


export type RootStackParamsAuth = {
    auth: undefined,
    loginEmail: undefined,
    registerBirthday: undefined,
    registerEmail: undefined,
    registerPassword: undefined,
    registerUserName: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamsAuth>()

const AuthNavigation: React.FC = () => {
    const{ theme, darkMode, toggleTheme } = useTheme()
    const myTheme = getNavigationTheme(theme)
    return (
        <RegisterUserProvider>
            <NavigationContainer 
                theme={myTheme} 
            >   
                <Stack.Navigator 
                    initialRouteName='auth'
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen 
                        name='auth'
                        component={AuthScreen}
                    />
                    <Stack.Screen 
                        name='loginEmail'
                        component={LoginEmailScreen}
                    />
                    <Stack.Group>
                        <Stack.Screen 
                            name='registerBirthday'
                            component={RegisterBirthdayScreen}
                        />
                        <Stack.Screen 
                            name='registerEmail'
                            component={RegisterEmailScreen}
                        />
                        <Stack.Screen 
                            name='registerPassword'
                            component={RegisterPasswordScreen}
                        />
                        <Stack.Screen 
                            name='registerUserName'
                            component={RegisterUserNameScreen}
                        />
                    </Stack.Group>
                </Stack.Navigator>

                {/* <Button 
                    title={darkMode? 'Active lightMode' : 'Activar darkMode'} 
                    onPress={toggleTheme}
                /> */}

            </NavigationContainer>
        </RegisterUserProvider>
    )
}

export default AuthNavigation
