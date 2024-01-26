import React, { useState } from 'react'
import { Modal, SafeAreaView, StyleSheet, View, } from 'react-native';
import { Button, Text } from '@rneui/themed'
import { useAuth, useTheme } from '../../../hooks';
import { MyText } from '../../../components';

const AppScreen = () => {
    const [isVisibleModal, setIsVisibleModal] = useState(true)
    
    const{ darkMode, toggleTheme } = useTheme()
    const { logout } = useAuth()
    return (
        <SafeAreaView style={{flex: 1, marginHorizontal: 20, justifyContent: 'space-between'}} >
            <Text>AppScreen</Text>
            {/* <Button 
                title={darkMode? 'Activar lightMode' : 'Activar darkMode'} 
                onPress={toggleTheme}
            /> */}
            {/* <Button 
            onPress={()=> setIsVisibleModal(true)}
                title='Visible modal'
            /> */}
            <Button 
            onPress={logout}
                title='Cerrar Sesion'
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisibleModal}
                onRequestClose={() => {
                setIsVisibleModal(!isVisibleModal);
            }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    
                    <MyText style={styles.modalText} type='h4' text='Ready to see the best videos just swipe up to continue browsing.' />
                    
                    <Button 
                        titleStyle={ { fontSize: 16,
                            fontWeight: '500', color:'#f5f5f5'}}
                        buttonStyle={{ paddingVertical: 12, paddingHorizontal: 20, marginBottom: 10}}
                        title="Let's go"
                        onPress={() =>{
                            setIsVisibleModal(false)
                        }}
                    />
                

                </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default AppScreen

const styles = StyleSheet.create({

    centeredView: {
        opacity: .5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        margin: 60,
        backgroundColor: 'gray',
        borderRadius: 20,
        padding: 25,
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