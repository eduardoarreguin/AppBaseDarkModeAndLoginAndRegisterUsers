import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle  } from 'react-native';
import { Text } from '@rneui/themed';

type Type = 'h1' | 'h2' | 'h3' | 'h4';

interface Props {
  text: string;
  type: Type;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
  left?: boolean;
}

export const MyText: React.FC<Props> = ({ text, type, style, children, left }: Props) => {
    const customStyles = styles[type] || {}; // Estilo específico o un objeto vacío si no hay estilo específico

    return (
        <Text style={[ styles.default, customStyles, style, {textAlign: left? 'left' : 'center'} ]}>
            {text}
            {children}
        </Text>
    )
};


const styles = StyleSheet.create({
    default: {
        // Estilos predeterminados comunes a todos los tipos
    },
    h1: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    h2: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    h3: {
        fontSize: 18,
        textAlign: 'center',
    },
    h4:{
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '300',
        //color:'#404040'
    }
});
