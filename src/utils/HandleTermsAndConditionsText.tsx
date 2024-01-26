import React from 'react';
import { Text } from '@rneui/themed';
import { Linking } from 'react-native';


interface CustomTextProps {
    text: string;
    onPress?: (part: string) => void;
}

const CustomText: React.FC<CustomTextProps> = ({ text, onPress }) => {
    const parts = text.split(/(\*\*.*?\*\*)/);

    return (
        <Text>
            {parts.map((part, index) =>
                index % 2 === 1 ? (
                    <Text
                        key={index}
                        onPress={() => onPress && onPress(part.replace(/\*\*/g, ''))} 
                    >
                        <Text style={{fontWeight: 'bold' }}>{part.replace(/\*\*/g, '')}</Text>
                    </Text>
            ) : (
                <Text key={index}>{part}</Text>
                )
            )}
        </Text>
    );
};
interface Props{text: string}

export const HandleTermsAndConditionsText: React.FC<Props> = ({text}: Props) => {
    const handlePress = (part: string) => {
        const url1 = 'https://www.facebook.com';
        const url2 = 'https://www.google.com';
        const url3 = 'https://www.youtube.com'; 
        switch(part){
            case('Terms of service'):
                return Linking.openURL(url1);
            case('Privacy Policy'):
                return Linking.openURL(url2);
            case('More information'):
                return Linking.openURL(url3);
        }
    };

    return (
        <CustomText
            text={text}
            onPress={handlePress}
        />
    );
};




