import { UserLogin, UserRegister } from "../interfaces/interfaces";
import { ENV } from "../utils";

export class Auth {
    async register(user: UserRegister){
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.Register}`
        const params = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        };
        try {
            const response = await fetch(url, params);
            if (response.ok) {
                const result = await response.json();
                if(response.status !== 201) throw result;
                return result;
            }else{
                const errorData = await response.json();
                console.error('Detalles del error de registro:', errorData);
                throw new Error(errorData.detail);
            }
        
            
        } catch (error) {
            console.error('error de registro', error);
            throw error;
        }
        
    }

    async login(user: UserLogin){
        
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.Login}`
        const params = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        };
        try {
            const response = await fetch(url, params);
            console.log('response login',response)

            if (response.ok) {
                const result = await response.json();
                if(response.status !== 200) throw result;
                return result;
            }else{
                const errorData = await response.json();
                console.error('Detalles del error de login:', errorData);
                throw new Error(errorData.detail);
            }  
        } catch (error) {
            console.error('error de login', error);
            throw error;
        }
    }

    refreshToken = async(token: string) => {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.RefreshToken}`
        const params = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({refresh: token})
        };
        try {
            const response = await fetch(url, params);
            //const response = await fetch(`${url}?username=${username}`);

            if (response.ok) {
                const result = await response.json();
                if(response.status !== 200) throw result;
                return result;
            }else{
                const errorData = await response.json();
                console.error('Detalles del error de RefreshToken:', errorData);
                throw new Error(`Error De RefreshToken: ${response.status} - ${response.statusText}`);
            }

        } catch (error) {
            console.error('error de RefreshToken', error);
            throw error;
        }
    }

    checkUsernameAvailability = async (username: string) => {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.ValidateUsernameExist}`
        try {
            const response = await fetch(`${url}?username=${username}`);
            if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        
            const result = await response.json();
            if(response.status !== 200) throw result;

            console.log('result username',result); 
            return result;
        } catch (error) {
            console.error('error get username', error);
            throw error;
        }
        
    };

    checkEmailAvailability = async (email: string) => {
        const url = `${ENV.BASE_API}/${ENV.API_ROUTES.ValidateEmailExist}`;
        try {
            const response = await fetch(`${url}?email=${email}`);
            if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
    
            const result = await response.json();
            if (response.status !== 200) throw result;
    
            console.log('result email ',result); 
            return result;
        } catch (error) {
            console.error('error get email', error);
            throw error;
        }
    };
    

};

