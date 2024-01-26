import React from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button } from '@rneui/themed';

import { useNavigation } from '@react-navigation/native';
import { MyText } from './MyText';

  
interface Props{
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const GoBackBirthdayModal:React.FC<Props> = ({isVisible, setIsVisible }:Props) => {
    const navigation = useNavigation();
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
            setIsVisible(!isVisible);
        }}>
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
            
            <MyText style={styles.modalTextTitle} type='h3' text='Add your date of birth to enjoy Vibehub' />
            <MyText style={[styles.modalText, styles.textSecondary]} type='h4' text='It is mandatory for you to enjoy your experience and creativity on Vibehub' />

            <Button 
                
                buttonStyle={{ paddingVertical: 12, paddingHorizontal: 20, marginBottom: 10}}
                title='Add Date of Birth' 
                onPress={() => setIsVisible(!isVisible)}
            />
           
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <MyText style={[styles.modalText, styles.textSecondary]} type='h4' text='Go back' />
            </TouchableOpacity>

        </View>
        </View>
    </Modal>
  )
}



const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
        modalView: {
        margin: 25,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        paddingBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
        
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTextTitle: {
        marginBottom: 15,
        fontWeight: '700',
        color: '#121212'
    },
    modalText: {
        marginBottom: 15,
    },
    textSecondary:{
        fontWeight: '300',
        color:'#404040'
    },
})