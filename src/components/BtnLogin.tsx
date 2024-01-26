import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SocialIcon, SocialMediaType } from '@rneui/themed'

interface Props{
    title: string;
    type: SocialMediaType
}

export const BtnLogin: React.FC <Props>= ({title, type}:Props) => {
  return (
        <TouchableOpacity
            style={styles.itemRegister}
        >
            <SocialIcon
                title={title}
                button
                type={type}
                style={styles.socialIcon}
                iconType='font-awesome'
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemRegister:{
        flexDirection: 'row',
        marginTop: 3
                
                
    },
    socialIcon:{
        flex: 1, 
        borderRadius: 4, 
    }
})