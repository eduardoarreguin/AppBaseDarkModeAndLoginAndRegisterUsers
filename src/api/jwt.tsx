
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";
import { ENV, SECRET_WORD, } from "../utils";
import { Tokens } from "../interfaces/interfaces";

const saveTokens = async({access, refresh}: Tokens) => {
    await AsyncStorage.setItem(ENV.JWT.Access, access!)
    await AsyncStorage.setItem(ENV.JWT.Refresh, refresh!)
}

const getTokens = async() => {
    const access = await AsyncStorage.getItem(ENV.JWT.Access)
    const refresh = await AsyncStorage.getItem(ENV.JWT.Refresh)
    return{
        access,
        refresh
    }
}
 
const removeTokens  = async() => {
    await AsyncStorage.removeItem(ENV.JWT.Access)
    await AsyncStorage.removeItem(ENV.JWT.Refresh)

}

const hasExpired = (token: string | null): boolean => {
    //console.log('Token:', token);
    if (!token) {
        console.log('Token is null or undefined.');
        return true; 
    }
 
    try {
        const decode = JWT.decode(token, SECRET_WORD);
        const {exp} = decode
        if (typeof exp === 'number') {
            const currentDate = new Date().getTime();
            const expiredDate = new Date(exp * 1000).getTime();
            return currentDate > expiredDate;
        }
        console.log('Invalid expiration format.');
        return true
        
    } catch (error) {
        console.error('Error decoding token:', error);
        return true
    }

}; 
    

export const jwt = {
    saveTokens,
    getTokens,
    removeTokens,
    hasExpired
}

