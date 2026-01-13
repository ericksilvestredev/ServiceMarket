import { useState, createContext, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const authData = response.data;
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', JSON.stringify(authData));
        setUser(authData);
        return authData;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
