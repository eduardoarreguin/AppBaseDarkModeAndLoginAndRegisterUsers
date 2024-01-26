import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, SafeAreaView, View } from 'react-native';
import { Button, CheckBox, Icon, Input } from '@rneui/themed';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsAuth } from '../../../navigation/AuthNavigation';

import { useTheme } from '../../../hooks'
import { MyText } from '../../../components'
import { useRegisterUser } from '../../../hooks';


interface Props extends NativeStackScreenProps<RootStackParamsAuth, 'registerPassword'>{};

const regexLeterAndNumber = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
const regexSpecialCaracter = /[!@#$%^&*(),.?":{}|<>]/;

export const RegisterPasswordScreen: React.FC<Props> = ({ navigation }: Props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const [ hasMinSize, setHasMinSize] = useState<boolean>(false)
    const [ hasLeterAndNumber, setHasLeterAndNumber] = useState<boolean>(false)
    const [ hasSpecialCaracter, setHasSpecialCaracter] = useState<boolean>(false)
   
    const [securityPercentage, setSecurityPercentage] = useState<number>(0);
    const [colorPersentaje, setColorPersentaje] = useState<string>('')
    const [textPersentaje, setTextPersentaje] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)


    const { theme } = useTheme()
    const { user, setUser } = useRegisterUser();
    const [animatedValue ] = useState(new Animated.Value(0));

    useEffect(() => { 
        Animated.timing(animatedValue, {
            toValue:  securityPercentage,
            duration: 750,
            useNativeDriver: false,
        }).start(() => {
        });

    }, [securityPercentage]);
    
    useEffect(() => {
        updateSecurityPercentageSize();
        updateSecurityPercentageColor();
        updateSecurityPercentageText();
    }, [inputValue]);

    const handleInputChange = (text:string) => {
        setInputValue(text);
        text.length>=8 && text.length< 20? setHasMinSize(true) : setHasMinSize(false) 
        regexLeterAndNumber.test(text)? setHasLeterAndNumber(true) : setHasLeterAndNumber(false)
        regexSpecialCaracter.test(text)? setHasSpecialCaracter(true) : setHasSpecialCaracter(false)
    };

    const updateSecurityPercentageSize = () => {
        const validConditions = [hasMinSize, hasLeterAndNumber, hasSpecialCaracter];
        const numberOfValidConditions = validConditions.filter((condition) => condition).length;
        if(numberOfValidConditions===0) setSecurityPercentage(2);
        if(numberOfValidConditions===1) setSecurityPercentage(25);
        if(numberOfValidConditions===2) setSecurityPercentage(60);
        if(numberOfValidConditions===3) setSecurityPercentage(100);
    };

    const updateSecurityPercentageColor = () => {
        const validConditions = [hasMinSize, hasLeterAndNumber, hasSpecialCaracter];
        const numberOfValidConditions = validConditions.filter((condition) => condition).length;
        if(numberOfValidConditions===0) setColorPersentaje('#8B0000');
        if(numberOfValidConditions===1) setColorPersentaje('red');
        if(numberOfValidConditions===2) setColorPersentaje('orange');
        if(numberOfValidConditions===3) setColorPersentaje('green');
        
    };

    const updateSecurityPercentageText = () => {
        const validConditions = [hasMinSize, hasLeterAndNumber, hasSpecialCaracter];
        const numberOfValidConditions = validConditions.filter((condition) => condition).length;
        if(numberOfValidConditions===0) setTextPersentaje('Nula');
        if(numberOfValidConditions===1) setTextPersentaje('Baja');
        if(numberOfValidConditions===2) setTextPersentaje('Media');
        if(numberOfValidConditions===3) setTextPersentaje('Alta');
        
    };

    const handleNavigation = () => {
        setLoading(true)
        setUser({
            ...user,
            password: inputValue
        })
        navigation.navigate('registerUserName')
        setTimeout(()=>{
            setInputValue('');
            setHasMinSize(false);
            setHasLeterAndNumber(false);
            setHasSpecialCaracter(false);
            setSecurityPercentage(0)
            setColorPersentaje('')
            setTextPersentaje('')
            setLoading(false)
        }, 500)
        
    }
    return (
        <SafeAreaView style={styles.container} >
            <MyText style={{marginVertical:50}} text='Password' type='h2' />
            <Input 
                selectionColor="rgb(252,134,8)" 
                placeholder='Password' 
                secureTextEntry={!showPassword} 
                inputStyle={{color: theme.Default.backgroundTerciary}}
                rightIcon={
                    <View style={{flexDirection: 'row'}} >
                        <Icon 
                            onPress={() => {
                                setInputValue('');
                                setHasMinSize(false);
                                setHasLeterAndNumber(false);
                                setHasSpecialCaracter(false);
                                setSecurityPercentage(0)
                                setColorPersentaje('')
                                setTextPersentaje('')
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

                keyboardType='email-address'
                autoCapitalize='none' 
                autoFocus
                
                value={inputValue}
                onChangeText={handleInputChange}
            />
            <View style={styles.contentErrors} >
                <MyText style={{marginBottom: 7}}  left type='h3' text='Tu contraseña debe tener al menos:' />

                <CheckBox 
                    disabled
                    textStyle={[{color:theme.Text.style.color}]}
                    disabledTitleStyle={styles.textCheckBox}
                    checked={hasMinSize}
                    onPress={() => setHasMinSize(!hasMinSize)}
                    iconType={'material-community'}
                    checkedIcon="checkbox-marked-circle"
                    uncheckedIcon="checkbox-blank-circle-outline" 
                    checkedColor="green" 
                    uncheckedColor="gray"
                    size={20} 
                    title='8 caracteres (20 max.)'  
                    containerStyle={{ margin: 0, padding: 0, backgroundColor: theme.Default.background }} 
                />
                <CheckBox
                    disabled
                    textStyle={[{color:theme.Text.style.color}]}
                    disabledTitleStyle={styles.textCheckBox}
                    checked={hasLeterAndNumber}
                    onPress={() => setHasLeterAndNumber(!hasLeterAndNumber)}
                    iconType={'material-community'}
                    checkedIcon="checkbox-marked-circle"
                    uncheckedIcon="checkbox-blank-circle-outline" 
                    checkedColor="green" 
                    uncheckedColor="gray"
                    size={20} 
                    title='1 letra y 1 numero'  
                    containerStyle={{ margin: 0, padding: 0, backgroundColor: theme.Default.background}} 
                />
                <CheckBox 
                    disabled                    
                    textStyle={[{color:theme.Text.style.color}]}
                    disabledTitleStyle={styles.textCheckBox}
                    checked={hasSpecialCaracter}
                    onPress={() => setHasSpecialCaracter(!hasSpecialCaracter)}
                    iconType={'material-community'}
                    checkedIcon="checkbox-marked-circle"
                    uncheckedIcon="checkbox-blank-circle-outline" 
                    checkedColor="green" 
                    uncheckedColor="gray"
                    size={20} 
                    title='1 caracter especial (como # ? ! $ & @)'  
                    containerStyle={{ margin: 0, padding: 0, backgroundColor: theme.Default.background }} 
                />

                <View 
                    style={[ 
                        styles.progressBarContainer, 
                        {backgroundColor: theme.Default.backgroundSecondary }]} 
                    >
                    <Animated.View
                        style={[
                            styles.progressBar,
                            {
                            backgroundColor: colorPersentaje,
                            width: animatedValue.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                            },
                        ]}
                    />

                </View>
                <View style={{flexDirection: 'row'}} >
                    <MyText left type='h4' text='Seguridad de la password:' />
                    <MyText left type='h4' text={`${textPersentaje}`} style={{ fontWeight: 'bold', marginLeft: -5}} />

                </View>

            </View>
            <Button 
                disabled={!hasMinSize || !hasLeterAndNumber || !hasSpecialCaracter}
                title={'Next'} 
                onPress={()=>{ handleNavigation()}}
                titleStyle={{ color:'#f5f5f5' }}
                buttonStyle={{  marginTop: 30}}
                loading={loading}
                
            />
            {/* <Button title='go back' onPress={()=> navigation.goBack()} /> */}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 20,
    },
    contentErrors:{

    },
    textCheckBox:{
        fontWeight: '700', 
    },

    progressBarContainer: {
    width: '94%',
    marginLeft: '3%',
    height: 12,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
    width: '100%'
  },
    
})