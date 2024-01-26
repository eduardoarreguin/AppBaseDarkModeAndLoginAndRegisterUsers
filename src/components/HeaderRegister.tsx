import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { MyText } from './MyText'
import { Icon } from '@rneui/themed'
import { useTheme } from '../hooks'
import { useNavigation } from '@react-navigation/native'

interface Props{
    setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
}

export const HeaderRegister:React.FC<Props> = ({setModalVisible, text}:Props) => {
    const navigation = useNavigation()
    const{ theme } = useTheme();

    const handlePress = () => {

        setModalVisible? setModalVisible!(true) : navigation.goBack()
    }
    return (
        <View style={styles.contentHeader} >
            <Pressable
                style={styles.btnGoBack}
                onPress={handlePress}>
                <Icon 
                    color={theme.Text.style.color} 
                    type='font-awesome-5' 
                    name='arrow-left' 
                    size={23}
                />
            </Pressable>
            <MyText type='h2' text={text} />
        </View>
  )
}

const styles = StyleSheet.create({
    contentHeader:{
        alignItems:'center', 
        marginVertical: 50,

    },
    btnGoBack:{
        position: 'absolute',
        left: -5
    },
})