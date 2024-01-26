import { useContext } from 'react'
import { AuthContext } from '../context'
import { AuthContextType } from '../interfaces/interfaces';

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a UserProvider');
    }
    return context; 
};