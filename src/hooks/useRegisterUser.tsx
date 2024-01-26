import { useContext } from 'react'
import { RegisterUserContext } from '../context'
import { RegisterContextType } from '../interfaces/interfaces';

export const useRegisterUser = (): RegisterContextType => {
    const context = useContext(RegisterUserContext);
    if (!context) {
        throw new Error('useRegisterUser must be used within a UserProvider');
    }
    return context;
};