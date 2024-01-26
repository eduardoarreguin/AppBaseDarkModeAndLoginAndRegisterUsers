
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ChildrenProps, AuthContextType, Tokens } from '../../interfaces/interfaces';
import JWT from 'expo-jwt';
import { jwt, Auth } from '../../api';
import { SECRET_WORD } from '../../utils';
import { JWTBody } from 'expo-jwt/dist/types/jwt';


const authController = new Auth();

export const AuthContext = createContext<AuthContextType | undefined>({
    auth: undefined,
    accessToken: null,
    refreshToken: null,
    login: (tokens: Tokens) => {},
    logout: () => {}
}); 


export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [auth, setAuth] = useState<undefined | JWTBody<unknown>>(undefined);
    const [accessToken, setAccessToken] = useState<null | string>(null);
    const [refreshToken, setRefreshToken] = useState<null | string>(null);

    useEffect(()=>{
        (async() =>{  
        
            const response = await jwt.getTokens();
            const accessExpired = jwt.hasExpired(response.access);
              
            if(accessExpired){  
                const refreshExpired = jwt.hasExpired(response.refresh)

                if(refreshExpired){
                    logout()
                }else{
                    try {
                        console.log( 'New Access Token')
                        if(response.refresh){
                            const result = await authController.refreshToken(response.refresh)
                            jwt.saveTokens({ 
                                access: result.access, 
                                refresh: response.refresh
                            })
                            login({ 
                                access: result.access, 
                                refresh: response.refresh
                            })
                        }
                        
                        
                    } catch (error) {
                        console.error(error)
                        logout()
                    }
                }
            }else{
                login(response)
            }
        })() 
    },[])

    const login = (tokens: Tokens) => {
        const { access, refresh} = tokens
        if(access && refresh){
 
            try { 
                const decodedTokenAccess = JWT.decode(access, SECRET_WORD, { timeSkew: 3600 });
                setAuth(decodedTokenAccess)
                setAccessToken(access)
                setRefreshToken(refresh) 
                jwt.saveTokens({access, refresh}) 
            } catch (error) {
                console.error('Error decoding JWT:', error);
            }
            

        }else{
            logout()
        }
    }
    const logout = () => {
        setAuth(undefined)
        setAccessToken(null)
        setRefreshToken(null)
        jwt.removeTokens()
    }
    const data = {
        auth, 
        accessToken, 
        refreshToken, 
        login, 
        logout
    }

    //if (auth === undefined) return null

    return (
        <AuthContext.Provider value={ data }>
            {children}
        </AuthContext.Provider>
    );
};

