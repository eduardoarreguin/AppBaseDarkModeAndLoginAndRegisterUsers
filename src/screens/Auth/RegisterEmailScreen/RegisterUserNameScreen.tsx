import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { Button, Input } from '@rneui/themed'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamsAuth } from '../../../navigation/AuthNavigation'

import { MyText } from '../../../components';
import { useAuth, useTheme, useRegisterUser, useDebounced } from '../../../hooks'
import { Auth } from '../../../api';

interface Props extends NativeStackScreenProps<RootStackParamsAuth, 'registerUserName'>{};

export const RegisterUserNameScreen: React.FC<Props> = ({ navigation }: Props) => {
    const authInstance = new Auth();

    const [isValidUserName, setIsValidUserName] = useState<boolean>(false)
    const [existsUserName, setExistsUserName] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isSpaces, setIsSpaces] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)


    const {theme} = useTheme();
    const { user, setUser } = useRegisterUser();
    const debouncedInput = useDebounced(inputValue, 500);
    const { login } = useAuth();


    useEffect(() => {
        // Verificar si inputValue ya tiene un valor antes de validar
        if (inputValue !== '') {
            validateAndSetError();
        }
    }, [debouncedInput]);
    
    const validateAndSetError = async () => {
        if (inputValue !== '') {
            if (!hasSpaces(inputValue)) {
                try {
                    // Llamada a validateUserNameExist
                    const isValid = await validateUserNameExist();
                    setExistsUserName(isValid);
                    // Verifica si la petición fue exitosa
                    if (!isValid) {
                        setError('');
                    } else {
                        setError('Name not available');
                    }
                } catch (error) {
                    console.log(error);
                    // Manejar el error al conectar con el servidor
                    setExistsUserName(false);
                    setError('Error connecting to the server');
                }
            } else {
                setIsValidUserName(false);
                setError('User name cannot have spaces');
            }
        } else {
            // Reiniciar el estado de error cuando inputValue está vacío
            setError('');
            setIsValidUserName(false);
        }
    };

    const handleInputChange = (text:string) => {
        if (text.length <= 30) setInputValue(text);
        setIsSpaces(()=> hasSpaces(text) ) 
    };

    const hasSpaces = (text: string) => {
        return text.includes(' ')
    };

    const validateUserNameExist = async () => {
        try {
            const response = await authInstance.checkUsernameAvailability(inputValue.trim());
            return response.is_taken_username; 
        } catch (error) {
            console.log(error);
            setExistsUserName(false);
            return false
        }
    };

    const handleNavigation = async(skip: boolean = false) => {
        setLoading(true)
        try {
            await authInstance.register({
                ...user,
                username: skip? `${user.email!.split('@')[0]}${Math.floor(Math.random() * 90) + 10}` : inputValue
            });
            if(user.email !== null && user.password !== null){
                const response = await authInstance.login({ email:user.email, password:user.password  });
                login(response) 
            }
                
        } catch (error: any) {
            if (error && error.message) {
                alert(error.message)
            } else if (error.error) {
                alert(error.error)
            } else {
                alert('An error occurred. Please try again later.')
            }

            setLoading(false);
        }
    }
    
    return (
        <SafeAreaView  style={styles.container} >

            <TouchableOpacity onPress={()=> handleNavigation(true)} style={{position: 'absolute', top: Platform.OS ==='ios'? 80 : 30, left: -10}} >
                <MyText   type='h3' text='Skip' />
            </TouchableOpacity>

            <MyText style={{marginVertical:50}} text='User Name' type='h2' />
            <MyText left style={{marginBottom: 20}} text='It can be anyone and can be changed later. If you skip this step, you will automatically be assigned a default user name.' type='h4' />

            <Input 
                selectionColor={error===''? "rgb(252,134,8)" : 'red'} 
                placeholder='Add your user name' 
                keyboardType='default'
                autoCapitalize='none' 
                inputStyle={{color: theme.Default.backgroundTerciary,}} 
                autoFocus
                errorStyle={{marginLeft: 40}}
                errorMessage={error}
                value={inputValue}
                onChangeText={handleInputChange}
                inputContainerStyle={{borderBottomColor: error!==''?'red': 'rgb(116, 128, 140)'}}
                
            />
            
            <MyText left style={{fontSize: 12, marginTop: -20, marginBottom: 30, 
                color: inputValue.length >= 30? 'red' : 'gray'
                 }} text={`${inputValue.length}/30`} type='h4' />
            
            <Button 
                disabled={error!== '' || inputValue === ''}
                title={'Next'} 
                onPress={()=> {handleNavigation()}}
                titleStyle={{ color:'#f5f5f5' }}
                buttonStyle={{ marginBottom: 10}}
                loading={loading}
                
            />
            {/* <Button title='go back' onPress={()=> navigation.goBack()} /> */}

        </SafeAreaView>
    )
}

export default RegisterUserNameScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 20
    },
})