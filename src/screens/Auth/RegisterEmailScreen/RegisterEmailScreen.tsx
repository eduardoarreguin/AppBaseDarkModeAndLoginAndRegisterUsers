import React, { useState, useEffect } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from '@rneui/themed'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamsAuth } from '../../../navigation/AuthNavigation'

import { MyText } from '../../../components'
import { useDebounced } from '../../../hooks'
import { useTheme } from '../../../hooks'
import { Auth } from '../../../api'

import { HandleTermsAndConditionsText, validateEmail } from '../../../utils'
import { useRegisterUser } from '../../../hooks';



interface Props extends NativeStackScreenProps<RootStackParamsAuth, 'registerEmail'>{};

export const RegisterEmailScreen: React.FC<Props> = ({ navigation }: Props) => {

    const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
    const [existsEmail, setExistsEmail] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)


    const authInstance = new Auth();
    const { theme } = useTheme();
    const { user, setUser } = useRegisterUser();
    const debouncedInput = useDebounced(inputValue, 500, isValidEmail);

    useEffect(() => { 
        const isValidEmail = validateEmail(debouncedInput);
        setIsValidEmail(isValidEmail);
      
        if (isValidEmail) {
          validateEmailExist();
        }
    }, [debouncedInput]);


    const handleInputChange = (text: string) => {
        setInputValue(text);
        setExistsEmail(false);
    };

    const validateEmailExist = async () => { 
        try {
            const response = await authInstance.checkEmailAvailability(inputValue.trim());
            setExistsEmail(response.is_taken_email);
            return !response.is_taken_email; 
        } catch (error) {
            console.log(error);
            setExistsEmail(false);
            return false
        }
    };

    const handleNavigation = async() => {
        setLoading(true)
        
        try {
            const isValid =  await validateEmailExist()
            if (isValid) {
                setUser({
                    ...user,
                    email: inputValue
                });
                navigation.navigate('registerPassword');
            }else{
                alert('something went wrong')
            }
            setTimeout(()=>{
                setLoading(false)
            }, 1000)

        } catch (error) {
            alert('Error navigating:');
            setTimeout(()=>{
                setLoading(false)
            }, 1000)
        }
    
    };

    const originalString = "By continuing you confirm that you agree to Vibehub's **Terms of service** and that you have read Vibehub's **Privacy Policy**, the email may be used to connect with people you may know, improve the ads you see, and more, depending on your settings. **More information**"

    return (
        <SafeAreaView style={styles.container} >
            <MyText style={{marginVertical:50}} text='Email' type='h2' />

            <View style={{ height: 75 }} >
                <Input 
                    selectionColor={!existsEmail? "rgb(252,134,8)" : 'red'} 

                    placeholder='Email' 
                    keyboardType='email-address'
                    autoCapitalize='none' 
                    inputStyle={{color: theme.Default.backgroundTerciary, borderBottomColor: 'blue'}} 
                    autoFocus
                    errorMessage={
                        existsEmail? 'Already used email' : ''
                    }
                    value={inputValue}
                    onChangeText={handleInputChange}
                    inputContainerStyle={{borderBottomColor: existsEmail?'red': 'rgb(116, 128, 140)'}}
                />
            </View>
            
            <View style={{ marginBottom: 20, marginHorizontal: 0}}>
                {HandleTermsAndConditionsText({text: originalString})}
            </View>
            <Button 
                disabled={existsEmail || !isValidEmail}
                title={'Next'} 
                onPress={handleNavigation}
                titleStyle={{ color:'#f5f5f5' }}
                buttonStyle={{ marginBottom: 10}}
                loading={loading}
                
            />

{/* <Button title='go back' onPress={()=> navigation.goBack()} /> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 20
    },
    
})