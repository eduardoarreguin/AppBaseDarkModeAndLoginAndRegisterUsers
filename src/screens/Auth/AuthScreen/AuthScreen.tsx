import React, { useEffect } from 'react'
import { SafeAreaView, TouchableOpacity, View, StyleSheet  } from 'react-native'
import { Icon, } from '@rneui/themed';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsAuth } from '../../../navigation/AuthNavigation';

import { BtnLogin } from '../../../components';
import { MyText } from '../../../components';
import { useTheme } from '../../../hooks';


interface Props extends NativeStackScreenProps<RootStackParamsAuth, 'auth'>{};

export const AuthScreen: React.FC<Props> = ({ navigation }: Props) => {
    const goToRegisterEmail = () => {
        navigation.navigate('registerBirthday')
    }
    const goToLoginEmail = () => { 
        navigation.navigate('loginEmail')
    }
    const{ theme } = useTheme()

    return ( 
        <SafeAreaView style={[styles.content]} >
            <View style={styles.optionsContent} >
                
                <View style={styles.containerTitle}>
                    <MyText type='h2' text='Register in ' style={{marginRight: 0}} >
                        <MyText type='h1' text='Vibe' />
                    </MyText>
                    <View style={{backgroundColor: 'rgb(252,134,8)', borderRadius: 2, marginHorizontal:0}} >
                        <MyText type='h1' text='hub' style={{marginHorizontal:2, color:'#121212' }} />
                    </View>
                </View>

                <MyText style={styles.textInfo} type='h4' text='Create a profile, follow other accounts, upload your own videos and more' />
            
                <TouchableOpacity
                    onPress={goToLoginEmail}
                    style={styles.itemRegister}
                >
                    <Icon 
                        color='#f5f5f5' 
                        containerStyle={{marginHorizontal: 10}}
                        type='font-awesome-5' 
                        name='user' 
                        size={23}
                    />
                    
                    <MyText style={styles.textBtn} type='h4' text='Sign in with Email' />
                    <View/>
                </TouchableOpacity>

                <BtnLogin title='Sign in with Facebook' type='facebook'/>   
                <BtnLogin title='Sign in with Google' type='google'/>
                <BtnLogin title='Sign in with Twitter' type='twitter'/>
                 {/* Todo agregar funcionalidad a los botones */}
            </View>

            <View 
                style={[
                    styles.loginContent,
                    {backgroundColor: theme.Default.backgroundSecondary }
                ]} 
            >
                <MyText style={[styles.textRegister]} type='h3' text="Don't have an account" ></MyText> 
                <TouchableOpacity  
                    style={{ marginLeft: -10 }} 
                    onPress={goToRegisterEmail}  
                >
                    <MyText style={styles.textRegisterBtn} type='h3' text='Sign up' />
                </TouchableOpacity >
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content: {
        height: '100%',
        justifyContent: 'space-between'
    },
    optionsContent:{
        marginHorizontal: 20,
        
    },
    containerTitle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end', 
        marginTop: 70,

    },
    textInfo:{
        marginTop: 15,
        marginBottom: 30,

    },
    itemRegister:{
        backgroundColor: 'rgb(252,134,8)',

        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 2,
        //borderColor: '#CCC',
        paddingVertical: 15,
        marginHorizontal:8,
        marginBottom:8,
        borderRadius: 4,
        
    },
    textBtn:{
        fontWeight: '700', 
        color: 'white'
    },
    loginContent:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        flexDirection: 'row', 
    },
    textRegister:{
        fontWeight: '300'
    },
    textRegisterBtn:{
        fontWeight: '500',
        color: '#DB4437',
    }
});



