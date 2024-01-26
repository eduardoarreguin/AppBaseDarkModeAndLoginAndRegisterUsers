import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Platform, Image, Dimensions } from 'react-native'
import { Button, Input  } from '@rneui/themed';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsAuth } from '../../../navigation/AuthNavigation';

import DateTimePickerAndroid  from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import { useTheme } from '../../../hooks';
import { useRegisterUser } from '../../../hooks';

import { MyText } from '../../../components';
import { HeaderRegister } from '../../../components';
import { GoBackBirthdayModal } from '../../../components';
import { GoRegisterModal } from '../../../components';


const { width } = Dimensions.get('window');  
interface Props extends NativeStackScreenProps<RootStackParamsAuth, 'registerBirthday'>{
    
};

export const RegisterBirthdayScreen: React.FC<Props> = ({ navigation }: Props) => {
    
    const [date, setDate] = useState(new Date());
    const [dateChosen, setDateChosen] = useState<boolean>(false);
    const [visibleModalGoBack, setVisibleModalGoBack] = useState<boolean>(false);    
    const [visibleModalGoRegister, setVisibleModalGoRegister] = useState<boolean>(false);
    const [goNextScreen, setGoNextScreen] = useState<boolean>(false);
    const [pickerVisibleAndroid, setPickerVisibleAndroid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    const { theme, darkMode } = useTheme();
    const { user, setUser } = useRegisterUser();

    useEffect(()=> {
        if(goNextScreen) {
            setUser({
                ...user,
                date
            })
            navigation.navigate('registerEmail')
        }
    },[goNextScreen])

    const onChange = (event: any, selectedDate?: Date) => {
        if(event.type === 'set'|| 'dismissed' && Platform.OS === 'android'){
            setPickerVisibleAndroid(false)
        }
        const currentDate = selectedDate || date;
        setDateChosen(true)
        setDate(currentDate);
    };

    const formatBirthdate = (birthdate: Date) => {
        const monthAbbreviations = [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ];
        const day = birthdate.getDate();
        const monthIndex = birthdate.getMonth() ;
        const year = birthdate.getFullYear();
        const monthAbbreviation = monthAbbreviations[monthIndex];
        const formattedDate = `${monthAbbreviation}/${day}/${year}`;
    
        return formattedDate;
    };
    

    const today = new Date();
    const maximumDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return (
        <SafeAreaView style={styles.container} >

            <HeaderRegister text='Sign up' setModalVisible={setVisibleModalGoBack} />

            <View style={styles.form} >

                <View>
                    <View style={{flexDirection: 'row', marginBottom: 30 }}>
                        <View style={{width: width-180, paddingTop: 20 }}>
                            <MyText style={{marginBottom: 10 }} left type='h2' text='What is your date of birth?' />
                            <MyText style={{color:theme.Default.textSecondary}} left type='h4' text="Your date of birth won't be displayed publicly" />
                        </View>
                        
                        <Image style={{width: 120, height: 120, }} source={require('./cake.png')} />
                        
                    </View>
                    <Input 
                        disabled 
                        value={dateChosen?formatBirthdate(date): ''}
                        placeholder='Date of birth' 
                        autoCapitalize='none' 
                        inputStyle={{color: theme.Default.backgroundTerciary, }} 
                        
                        rightIcon={
                            Platform.OS === 'android' && dateChosen &&
                            <Button 
                                title='Edit' 
                                buttonStyle={{margin: 0, paddingHorizontal: 15, paddingVertical: 5  }} 
                                onPress={()=> setPickerVisibleAndroid(!pickerVisibleAndroid)}
                            />
                                
                        }
                    />
                    <View style={{height: 40}} />
                    
                    <Button 
                        onPress={()=> {
                            Platform.OS === 'ios' || dateChosen?  
                                setVisibleModalGoRegister(true) 
                            : 
                                setPickerVisibleAndroid(!pickerVisibleAndroid)
                        }}
                        disabled={Platform.OS=== 'android'? false : !dateChosen} 
                        title={Platform.OS === 'ios' || dateChosen?  'Next' : 'Add'} 
                        disabledStyle={{ backgroundColor:theme.Default.backgroundSecondary }}
                        titleStyle={{color:'#f5f5f5'}}
                        loading={loading}
                    />
                </View>

                <View> 
                    { Platform.OS === 'ios'&&
                        <RNDateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date" 
                            is24Hour={true}
                            display="spinner" 
                            onChange={onChange}
                            maximumDate={maximumDate}
                            textColor={theme.Default.backgroundTerciary}
                            themeVariant={darkMode? 'light': 'dark'}

                        />
                    }
                    {  Platform.OS === 'android'&& pickerVisibleAndroid &&
                        <DateTimePickerAndroid
                            testID="dateTimePicker"
                            value={date}
                            mode="date" // Cambiado a "date" para seleccionar solo la fecha
                            is24Hour={true}
                            display="spinner" // Cambiado a "spinner"
                            onChange={onChange}
                            maximumDate={maximumDate}
                            
                        />
                    }
                </View>
            </View>

            <GoBackBirthdayModal isVisible={visibleModalGoBack} setIsVisible={setVisibleModalGoBack} />
            <GoRegisterModal 
                setLoading={setLoading}
                setGoNextScreen={setGoNextScreen}
                isVisible={visibleModalGoRegister} 
                setIsVisible={setVisibleModalGoRegister} 
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: Platform.OS === 'android'? 40 : 0,
    },
    
    form:{
        justifyContent: 'space-between',
        height: '100%',
        paddingBottom: 120,

    },
    

})






{/* <Input 
                    placeholder='Name' 
                    autoCapitalize='none' 
                    inputStyle={{color: theme.Default.backgroundTerciary}} 
                />
                    
                <Input 
                    keyboardType='phone-pad'
                    placeholder='Phone number' 
                    autoCapitalize='none' 
                    inputStyle={{color: theme.Default.backgroundTerciary}}  
                    returnKeyType="done"
                />
                
                
                <Input 
                    placeholder='Repeat Password' 
                    secureTextEntry={!showPassword} 
                    inputStyle={{color: theme.Default.backgroundTerciary}}
                    rightIcon={{
                        type:'material-community', 
                        name: showPassword? 'eye-off-outline' : 'eye-outline', 
                        color: theme.Default.backgroundTerciary,
                        onPress: () => setShowPassword(!showPassword)

                    }}
                /> */}