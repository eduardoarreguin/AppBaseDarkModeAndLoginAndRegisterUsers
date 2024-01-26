import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { Button } from '@rneui/themed';
import { MyText } from './MyText';

interface Props{
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setGoNextScreen: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    
}

export const GoRegisterModal:React.FC<Props> = ({isVisible, setIsVisible, setGoNextScreen, setLoading}:Props) => {
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
            
            <MyText style={styles.modalText} type='h4' text='You are about to start enjoying a Vibehub experience designed especially for you.' />
            <MyText style={styles.modalText} type='h4' text='choose a username and password to get started' />


            <Button 
                titleStyle={ { fontSize: 16,
                    fontWeight: '500', color:'#f5f5f5'}}
                buttonStyle={{ paddingVertical: 12, paddingHorizontal: 20, marginBottom: 10}}
                title="Let's go there"
                onPress={() =>{
                    setLoading(true)
                    setIsVisible(false)
                    setGoNextScreen(true)
                }}
            />
           

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
    
    modalText: {
        marginBottom: 15,
        fontWeight: '400',
        color:'#404040'
    },
    
})