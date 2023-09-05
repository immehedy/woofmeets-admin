import {useContext, createContext, useState} from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const login = (access_token, info) => {
        localStorage.setItem('user', JSON.stringify(info));
        localStorage.setItem('auth-token', access_token);
    }
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('auth-token');
    }

    return <AuthContext.Provider value={{login, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}