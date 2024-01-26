

import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Icon, Input } from '@rneui/themed';

import { useAuth, useTheme } from '../../../hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsAuth } from '../../../navigation/AuthNavigation';
import { HeaderRegister, MyText } from '../../../components';
import { validateEmail } from '../../../utils';
import { Auth } from '../../../api';

interface Props extends NativeStackScreenProps<RootStackParamsAuth, 'loginEmail'>{};

export const LoginEmailScreen: React.FC<Props> = ({ navigation }: Props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [onBlurEmail, setOnBlurEmail] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [isFocusedEmail, setIsFocusedEmail] = useState<boolean>(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const [loading, setLoading] = useState<boolean>(false);


    const{ theme } = useTheme();
    const authInstance = new Auth();
    const { login } = useAuth();
  
    useEffect(() => { 
        
        setIsValidEmail(validateEmail(email));
    }, [email]);

    const handleLogin = async() => {
        setLoading(true)
        try {
            const response = await authInstance.login({ email, password });
            login(response) 
            navigation.navigate('auth')    
        } catch (error: any) {

            if (error && error.message) {
                setError(error.message)
            } else if (error.error) {
                setError(error.error)
            } else {
                setError('An error occurred. Please try again later.')
            }

            setLoading(false);

        }
    }

    return (
        <SafeAreaView  style={styles.container} >
            <HeaderRegister text='Login'  />
            
            <Input 
                selectionColor={(onBlurEmail && !isValidEmail) || error !== '' ? 'red': "rgb(252,134,8)"  }
                onFocus={()=> setIsFocusedEmail(true)}
                onBlur={()=> {
                    setIsFocusedEmail(false)
                    setOnBlurEmail(true)
                }}
                placeholder='Email' 
                keyboardType='email-address'
                autoCapitalize='none' 
                inputStyle={{color: theme.Default.backgroundTerciary, height: 50, }} 
                autoFocus
                errorMessage={
                    onBlurEmail && !isValidEmail? 'write a valid email' : ''
                 }
                errorStyle={{ textAlign: 'right', marginRight: 0 }} 
                value={email}
                onChangeText={setEmail}
                inputContainerStyle={{borderBottomColor: (onBlurEmail && !isValidEmail) || error !== '' ? 'red': 'rgb(116, 128, 140)'}}
                rightIcon={
                    isFocusedEmail&&
                        <Icon 
                            onPress={() => {
                                setEmail('')
                            }} 
                            name="close" 
                            size={20} 
                            type='material-community'
                            color={theme.Default.backgroundTerciary}
                            style={{marginHorizontal: 8}} 

                        />
                }
                
            />
                
            <Input 
                selectionColor={ error !== '' ? 'red' : "rgb(252,134,8)"} 
                onFocus={()=> setIsFocusedPassword(true)}
                onBlur={()=> setIsFocusedPassword(false)}
                placeholder='Password' 
                secureTextEntry={!showPassword} 
                inputStyle={{color: theme.Default.backgroundTerciary, height: 50 }}
                errorMessage={error}
                errorStyle={{ textAlign: 'right', marginRight: 0 }} 
                rightIcon={
                    isFocusedPassword&&
                        <View style={{flexDirection: 'row'}} >
                            <Icon 
                                onPress={() => {
                                    setPassword('')
                                }} 
                                name="close" 
                                size={20} 
                                type='material-community'
                                color={theme.Default.backgroundTerciary}
                                style={{marginHorizontal: 8}} 

                            />
                            <Icon 
                                onPress={() => setShowPassword(!showPassword)}  
                                name={showPassword? 'eye-off-outline' : 'eye-outline'} 
                                size={20} 
                                type='material-community'
                                color={theme.Default.backgroundTerciary}
                            />

                        </View>
                }

                keyboardType='default'
                autoCapitalize='none' 
                value={password}
                onChangeText={setPassword}
                inputContainerStyle={{borderBottomColor: error !== '' ? 'red': 'rgb(116, 128, 140)'}}

            />
        
            <TouchableOpacity style={{marginBottom: 30, marginLeft: 3 }}  >
                <MyText style={{fontWeight: '600'}} left type='h4' text='Did you forget the password? ' />
            </TouchableOpacity>

            <Button 
                disabled={ !isValidEmail || password === '' }
                title='Login' 
                onPress={handleLogin}
                loading={loading}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 20
    },
})